import cn from 'classnames';
import { InputHTMLAttributes, useRef, useState } from 'react';

import { Button, Spinner } from '@famiryui/components';

import { EntryAccessState, EntryElement } from '@/hooks/access/types';
import useElementAccessCallback from '@/hooks/access/useElementAccessCallback';
import { useClickOutside } from '@/hooks/useClickOutside';
import { ReactComponent as WarningIcon } from '@/images/icons/warning.svg';
import { noop } from '@/utils';

import './UploadPhotoInput.css';

interface ClassNamesProps {
  label: string;
  input: string;
}

export interface UploadPhotoInputProps extends InputHTMLAttributes<HTMLInputElement> {
  imageSrc?: string;
  classNames?: Partial<ClassNamesProps>;
  onDelete?: () => void;
  onCrop?: () => void;
  isLoading?: boolean;
  hasError?: boolean;
}

export const UploadPhotoInput = ({
  imageSrc,
  classNames,
  onDelete,
  onCrop = noop,
  ...props
}: UploadPhotoInputProps) => {
  const [isActionsOpen, setIsActionsOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const accessMode = useElementAccessCallback()(EntryElement.SmallPersonCard_UploadAvatar);

  useClickOutside([menuRef], () => {
    setIsActionsOpen(false);
  });

  const onDeleteClick = () => {
    onDelete && onDelete();
    inputRef.current!.value = '';
    setIsActionsOpen(false);
  };
  const onChangeClick = () => {
    inputRef.current?.click();
    setIsActionsOpen(false);
  };

  const onCropClick = () => {
    onCrop && onCrop();
    setIsActionsOpen(false);
  };

  const { isLoading, hasError, ...otherProps } = props;

  props.disabled = accessMode !== EntryAccessState.Available;

  return (
    <div
      className={cn('upload-photo', classNames?.label, { 'upload-photo_disabled': props.disabled })}
    >
      <input
        type="file"
        className={cn('upload-photo__input', classNames?.input)}
        ref={inputRef}
        {...otherProps}
      />

      {props.isLoading && (
        <div
          className="upload-photo__loading"
          onClick={() => setIsActionsOpen(!isActionsOpen)}
        >
          <Spinner />
          Импорт...
        </div>
      )}

      {props.hasError && (
        <div
          className="upload-photo__error"
          onClick={() => setIsActionsOpen(!isActionsOpen)}
        >
          <WarningIcon />
          Ошибка импорта
          <Button onClick={onChangeClick}>Загрузить фото вручную</Button>
        </div>
      )}

      {!props.isLoading &&
        !props.hasError &&
        (imageSrc ? (
          <>
            <img
              className="upload-photo__image"
              src={imageSrc}
              alt="Фотография персоны"
            />

            {!props.disabled && (
              <button
                className="upload-photo__actions-button"
                type="button"
                onClick={() => setIsActionsOpen(!isActionsOpen)}
              />
            )}

            {isActionsOpen && (
              <div
                className="upload-photo__actions-menu"
                ref={menuRef}
              >
                {!props.isLoading && !props.hasError && (
                  <>
                    <div
                      className="upload-photo__actions-menu-item"
                      onClick={onDeleteClick}
                    >
                      Удалить фото
                    </div>
                    <div
                      className="upload-photo__actions-menu-item"
                      onClick={onChangeClick}
                    >
                      Заменить фото
                    </div>
                    <div
                      className="upload-photo__actions-menu-item"
                      onClick={onCropClick}
                    >
                      Обрезать фото
                    </div>
                  </>
                )}

                {props.isLoading && (
                  <>
                    <div
                      className="upload-photo__actions-menu-item"
                      onClick={onDeleteClick}
                    >
                      Возобновить импорт
                    </div>
                  </>
                )}

                {props.hasError && (
                  <>
                    <div
                      className="upload-photo__actions-menu-item"
                      onClick={onDeleteClick}
                    >
                      Отменить импорт
                    </div>
                  </>
                )}

                {props.isLoading ||
                  (props.hasError && (
                    <>
                      <div
                        className="upload-photo__actions-menu-item"
                        onClick={() => inputRef.current?.click()}
                      >
                        Загрузить фото вручную
                      </div>
                    </>
                  ))}
              </div>
            )}
          </>
        ) : (
          <label
            className="upload-photo__empty"
            onClick={() => inputRef.current?.click()}
          />
        ))}
    </div>
  );
};

export default UploadPhotoInput;