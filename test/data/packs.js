export const PACK_ID = '21dec724-4a40-48ef-9cf7-89f0fb3c4d07';

export const PACKS = [
    {
        id : '21dec724-4a40-48ef-9cf7-89f0fb3c4d07',
        duration : [
            2,
            'week'
        ],
        price : 590,
        priceWithoutDiscount : 590,
        visits : 1
    },
    {
        id : '3f7eb11c-12c5-4631-af4a-39855ca17810',
        duration : [
            1,
            'month'
        ],
        price : 1990,
        priceWithoutDiscount : 2990,
        visits : 4
    },
    {
        id : '3d678c9b-632d-492a-aaad-e1ced4f35255',
        duration : [
            3,
            'month'
        ],
        price : 3990,
        priceWithoutDiscount : 5990,
        visits : 8
    },
    {
        id : '8012db3e-b720-48ea-95a9-ba42772da33d',
        duration : [
            6,
            'month'
        ],
        price : 6990,
        priceWithoutDiscount : 9990,
        visits : 16
    }
];

export const PACKS_MAP = PACKS.reduce((acc, pack) => ({
    ...acc,
    [pack.visits]: pack.id
}), {});