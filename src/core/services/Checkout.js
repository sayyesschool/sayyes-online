export default ({
    config: { APP_URL },
    clients: { checkout },
    models: { Payment, Request, User },
    services: { Auth }
}) => {
    return {
        async createPayment({
            amount,
            description,
            purpose,
            customer = {},
            data = {},
            method,
            returnUrl,
            userId,
            requestId,
            utm,
            ...override
        } = {}) {
            const { name, email, phone } = customer;

            if (!userId && !email) throw {
                code: 400,
                message: 'Не указан email'
            };

            if (!amount) throw {
                code: 400,
                message: 'Не указана сумма платежа'
            };

            if (!purpose) throw {
                code: 400,
                message: 'Не указана цель платежа'
            };

            const user = await User.findOne({
                $or: [
                    { _id: userId },
                    { email }
                ]
            });

            if (userId && !user) throw {
                code: 404,
                message: 'Пользователь не найден'
            };

            const _payment = await checkout.createPayment({
                amount,
                description,
                method,
                confirmation: {
                    type: 'embedded'
                },
                returnUrl: returnUrl ? `${APP_URL}${returnUrl}` : undefined,
                customer: {
                    email: user?.email ?? email,
                    phone: user?.phone ?? phone
                },
                metadata: {
                    name,
                    email,
                    phone,
                    userId: user?.id,
                    ...data
                },
                ...override
            });

            const payment = await Payment.create({
                uuid: _payment.id,
                status: _payment.status,
                amount: _payment.amount.value,
                date: _payment.captured_at,
                description: _payment.description,
                operator: checkout.name,
                purpose,
                customer,
                paid: _payment.paid,
                refundable: _payment.refundable,
                test: _payment.test,
                confirmation: _payment.confirmation && {
                    type: _payment.confirmation.type,
                    confirmationToken: _payment.confirmation.confirmation_token,
                    confirmationUrl: _payment.confirmation.confirmation_url,
                    returnUrl: _payment.confirmation.return_url
                },
                method: _payment.payment_method && {
                    id: _payment.payment_method.id,
                    type: _payment.payment_method.type,
                    saved: _payment.payment_method.saved,
                    card: _payment.payment_method.card && {
                        type: _payment.payment_method.card.card_type,
                        last4: _payment.payment_method.card.last4,
                        month: _payment.payment_method.card.expiry_month,
                        year: _payment.payment_method.card.expiry_year,
                        country: _payment.payment_method.card.issuer_country,
                        issuer: _payment.payment_method.card.issuer_name
                    }
                },
                data: _payment.metadata,
                utm,
                userId,
                requestId,
                createdAt: _payment.created_at,
                expiresAt: _payment.expires_at,
                paidAt: _payment.captured_at
            });

            if (requestId) {
                await Request.update(requestId, {
                    status: Request.Status.Pending,
                    learnerId: user?.id,
                    paymentId: payment.id
                });
            }

            return payment;
        },

        async processPayment(uuid) {
            const payment = await this.resolvePayment(uuid);

            if (!payment) throw {
                code: 404,
                message: 'Платеж не найден'
            };

            if (!payment.isPaid) throw {
                code: 400,
                message: 'Платеж не оплачен'
            };

            if (payment.isProcessed) return payment;

            const userId = payment.userId || payment.data.userId;
            const user = userId
                ? await Auth.getUser({ $or: [
                    { _id: userId },
                    { email: payment.data.email }
                ] })
                : await Auth.register({
                    name: payment.data.name,
                    email: payment.data.email
                });

            if (payment.requestId) {
                await Request.update(payment.requestId, {
                    status: Request.Status.Completed,
                    learnerId: user.id
                });
            }

            return await Payment.update(payment.id, {
                userId: user.id,
                processedAt: new Date()
            }, { new: true });
        },

        async resolvePayment(uuid) {
            const payment = await checkout.getPayment(uuid).catch(error => {
                if (error.code === 'not_found') return null;
                else throw error;
            });

            if (!payment) throw {
                code: 404,
                message: 'Платеж не найден'
            };

            return Payment.findOneAndUpdate({ uuid: payment.id }, {
                status: payment.status,
                paid: payment.paid,
                refunded: payment.refunded,
                cancelation: payment.cancellation_details,
                method: payment.payment_method && {
                    id: payment.payment_method.id,
                    type: payment.payment_method.type,
                    saved: payment.payment_method.saved,
                    card: payment.payment_method.card && {
                        type: payment.payment_method.card.card_type,
                        last4: payment.payment_method.card.last4,
                        month: payment.payment_method.card.expiry_month,
                        year: payment.payment_method.card.expiry_year,
                        country: payment.payment_method.card.issuer_country,
                        issuer: payment.payment_method.card.issuer_name
                    }
                },
                paidAt: payment.captured_at
            }, { new: true });
        },

        async cancelPayment(uuid) {
            const payment = await checkout.cancelPayment(uuid);

            if (payment.isPending || payment.isCanceled) {
                return Payment.findOneAndUpdate({ uuid: payment.id }, {
                    $set: {
                        status: 'canceled'
                    },
                    $unset: {
                        confirmation: ''
                    }
                }, { new: true });
            }
        }
    };
};