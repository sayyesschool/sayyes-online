import { useCallback, useEffect, useRef, useState } from 'react';
import Cropper, { ReactCropperElement } from 'react-cropper';

import { ImageFrameInfo } from '@famirytree/treelib/build/interfaces';
import { Button, ButtonGroup, Divider, Text } from '@famiryui/components';

import { Loader } from '@/components/common';
import { ReactComponent as CropRotateLeft } from '@/images/icons/crop-rotate-bl.svg';
import { ReactComponent as CropRotateRight } from '@/images/icons/crop-rotate-tl.svg';
import { cn } from '@/utils';

import 'cropperjs/dist/cropper.css';
import styles from './PhotoCropper.module.scss';

const defaultCropperProps: Cropper.Options = {
  initialAspectRatio: 3 / 4,
  guides: false,
  viewMode: 2 as Cropper.ViewMode,
  background: false,
  responsive: true,
  center: false,
  highlight: false,
  autoCrop: true,
  minCropBoxWidth: 50,
  zoomable: false,
  minContainerHeight: 400,
};

export default function PhotoCropper({
  src,
  mainOptions,
  squareOptions,
  onCrop,
  onCancel,
}: {
  src: string;
  mainOptions?: ImageFrameInfo;
  squareOptions?: ImageFrameInfo;
  onCrop: (main, square) => void;
  onCancel: () => void;
}) {
  const cropperRef = useRef<ReactCropperElement>(null);

  const [cropperOptions, setCropperOptions] = useState<Cropper.Data>();
  const [smallCropperOptions, setSmallCropperOptions] = useState<Cropper.Data>();
  const [variant, setVariant] = useState<'small' | 'big'>('big');
  const [loading, setLoading] = useState(true);

  const crop = useCallback(() => {
    if (variant === 'big') {
      setCropperOptions(cropperRef?.current?.cropper.getData(true));

      if (!squareOptions && !smallCropperOptions) {
        const squareData = cropperRef?.current?.cropper.getData(true);

        if (squareData) {
          squareData.height = squareData.width;
        }

        setSmallCropperOptions(squareData);
      }
    } else {
      setSmallCropperOptions(cropperRef?.current?.cropper.getData(true));
    }
  }, [smallCropperOptions, squareOptions, variant]);

  const save = useCallback(() => {
    if (!cropperOptions) {
      crop();
    }
    onCrop(cropperOptions, smallCropperOptions);
  }, [cropperOptions, smallCropperOptions, crop, onCrop]);

  const cancel = useCallback(() => {
    onCancel();
  }, [onCancel]);

  const rotateLeft = useCallback(() => {
    cropperRef.current?.cropper?.rotate(-90);
    crop();
  }, [crop]);

  const rotateRight = useCallback(() => {
    cropperRef.current?.cropper?.rotate(90);
    crop();
  }, [crop]);

  const updateData = () => {
    cropperRef.current?.cropper.setAspectRatio(variant === 'big' ? 3 / 4 : 1);

    const data = variant === 'big' ? cropperOptions : smallCropperOptions;

    if (data) {
      cropperRef.current?.cropper.setData(data);
    }
  };

  useEffect(() => {
    setCropperOptions(mainOptions);
    setSmallCropperOptions(squareOptions);
    updateData();
  }, []);

  useEffect(() => {
    if (!loading) {
      updateData();
    }
  }, [variant, loading]);

  return (
    <div className={styles.root}>
      <div className={styles.tabs}>
        <button
          className={cn(styles.tab, {
            [styles.tabActive]: variant === 'big',
          })}
          onClick={() => setVariant('big')}
        >
          Обрезать основное фото
        </button>

        <button
          className={cn(styles.tab, {
            [styles.tabActive]: variant === 'small',
          })}
          onClick={() => setVariant('small')}
        >
          Обрезать миниатюру
        </button>
      </div>

      <div className={styles.content}>
        <div className={styles.description}>
          {variant === 'big' && (
            <Text
              type="p3"
              muted
            >
              Будет показана выбранная область. <br />
              Если изображение ориентировано неправильно, фотографию можно повернуть.
            </Text>
          )}

          {variant === 'small' && (
            <Text
              type="p3"
              muted
            >
              Выберите область для маленьких фотографий. <br />
              Выбранная миниатюра будет использоваться в карточке на древе
            </Text>
          )}
        </div>

        <div className={styles.main}>
          {loading ? (
            <Loader size="large" />
          ) : (
            <ButtonGroup className={styles.actions}>
              <Button
                icon={<CropRotateLeft />}
                onClick={rotateLeft}
              />

              <Divider
                className={styles.divider}
                orientation="vertical"
              />

              <Button
                icon={<CropRotateRight />}
                onClick={rotateRight}
              />
            </ButtonGroup>
          )}

          <Cropper
            key={variant}
            ref={cropperRef}
            className="cropper"
            src={src}
            data={variant === 'big' ? cropperOptions : smallCropperOptions}
            cropend={crop}
            ready={() => setLoading(false)}
            {...defaultCropperProps}
          />
        </div>

        <ButtonGroup className={styles.buttons}>
          <Button
            content="Отменить изменения"
            onClick={cancel}
          />

          <Button
            content="Сохранить изменения"
            variant="filled"
            color="primary"
            onClick={save}
          />
        </ButtonGroup>
      </div>
    </div>
  );
}
