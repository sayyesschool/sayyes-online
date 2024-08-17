import { useCallback, useEffect, useState } from 'react';

import type {
  MediaDocumentDBView,
  PersonAvatar,
  PersonDBView as Person,
} from '@famirytree/treelib/interfaces';
import { Dialog } from '@famiryui/components';

import { documentsApi } from '@/api/documents';
import PhotoCropper from '@/components/PhotoCropper';
import UploadPhotoInput from '@/components/UploadPhotoInput';
import { getCropperUrlParameters } from '@/helpers/cropper';
import { usePersonAvatar, usePersonsActions } from '@/hooks/person';
import { useCurrentTreeId } from '@/hooks/tree';

import styles from './PersonAvatarUploader.module.scss';

export default function PersonAvatarUploader({
  person,
  disabled,
  onChange,
}: {
  person: Person;
  disabled?: boolean;
  onChange?: (avatar?: PersonAvatar) => void;
}) {
  const currentTreeId = useCurrentTreeId();
  const {
    avatar: personAvatar,
    hasError: avatarHasError,
    isLoading: avatarIsLoading,
  } = usePersonAvatar(person?.id);
  const { updatePerson } = usePersonsActions();

  const [newPersonAvatar, setNewPersonAvatar] = useState<PersonAvatar>();
  const [isCropOpen, setIsCropOpen] = useState(false);

  useEffect(() => {
    onChange?.(newPersonAvatar);
  }, [newPersonAvatar, onChange]);

  const handleCrop = useCallback(
    (mainFrame, squareFrame) => {
      if (newPersonAvatar?.resource) {
        setNewPersonAvatar({
          resource: newPersonAvatar.resource,
          mainFrame,
          squareFrame,
        });
      } else {
        updatePerson(person, {
          avatar: {
            ...personAvatar,
            mainFrame,
            squareFrame,
          },
        });
      }

      setIsCropOpen(false);
    },
    [person, personAvatar, newPersonAvatar, updatePerson],
  );

  const handleChangeFile = useCallback(
    async ev => {
      if (ev?.target?.files?.length === 1) {
        const file = ev.target.files[0];

        if (file) {
          const document = (await documentsApi.uploadDocument(
            file,
            currentTreeId,
          )) as MediaDocumentDBView;

          if (document?.id) {
            if (person?.id) {
              updatePerson(person, {
                avatar: { resource: document.id },
              });
            } else {
              setNewPersonAvatar({ resource: document.id });
            }
            setIsCropOpen(true);
          }
        }
      }
    },
    [person, currentTreeId, updatePerson],
  );

  const handleDeleteFile = useCallback(() => {
    updatePerson(person, {
      avatar: { resource: '' },
    });
  }, [person, updatePerson]);

  const personAvatarId = newPersonAvatar?.resource || personAvatar?.resource;
  const personAvatarUrl = personAvatarId
    ? `/tree/v1/media/resizer/rs:fill:0/doc/${currentTreeId}/${personAvatarId}/`
    : '';
  const personAvatarCropperUrl = personAvatarId
    ? `/tree/v1/media/resizer/${getCropperUrlParameters((newPersonAvatar || personAvatar)?.mainFrame, 280, 363)}/doc/${currentTreeId}/${personAvatarId}/`
    : '';

  return (
    <div className={styles.root}>
      <UploadPhotoInput
        id="person-image"
        name="person-image"
        imageSrc={personAvatarCropperUrl}
        disabled={disabled}
        isLoading={avatarIsLoading}
        hasError={avatarHasError}
        onCrop={() => setIsCropOpen(true)}
        onChange={handleChangeFile}
        onDelete={handleDeleteFile}
      />

      <Dialog
        open={isCropOpen}
        onClose={() => setIsCropOpen(false)}
      >
        <PhotoCropper
          src={personAvatarUrl}
          mainOptions={personAvatar?.mainFrame}
          squareOptions={personAvatar?.squareFrame}
          onCrop={handleCrop}
          onCancel={() => setIsCropOpen(false)}
        />
      </Dialog>
    </div>
  );
}
