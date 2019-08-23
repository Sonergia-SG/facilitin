import idx from 'idx';
import { FolderPendingItem } from '../../../../store/reducer/views/folder/types';
import {
  FolderFull,
  FolderMOAString,
  FolderMOEString,
  FolderSiteString,
} from '../../../../store/reducer/entities/types';

interface Props {
  pending?: FolderPendingItem;
  pendingKey: 'moe' | 'moa' | 'site';
  valueKey:
  | keyof FolderMOAString
  | keyof FolderMOEString
  | keyof FolderSiteString;
  defValue?: string | null;
  dossierprime: FolderFull;
}

const resolveInputValue = ({
  pendingKey,
  pending,
  valueKey,
  defValue,
  dossierprime,
}: Props) => {
  const v = idx(pending, _ => _[pendingKey][valueKey]);
  const originalValue = defValue || dossierprime[valueKey];
  const cleanOriginalValue = originalValue === null || originalValue === undefined ? '' : originalValue;

  return typeof v === 'string' ? v : cleanOriginalValue;
};

export default resolveInputValue;
