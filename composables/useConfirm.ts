import { useModal } from 'vue-final-modal';
import ConfirmModal from '~/components/modals/Confirm.vue';
import type { Nullish } from '~/utils/types';

export type ConfirmParams = {
	title?: Nullish<string>;
	text: string;
	closeButton?: boolean;
	rejectText?: Nullish<string>;
	cancelText?: Nullish<string>;
	confirmText?: Nullish<string>;
};

export default function useConfirm() {
	return async ({
		title = 'Please Accept',
		text = '!!!',
		cancelText = 'Cancel',
		confirmText = 'Ok',
		rejectText = null,
		closeButton = true
	}: ConfirmParams) => {
		return await new Promise<Nullish<boolean>>((resolve) => {
			const { close, open } = useModal({
				component: ConfirmModal,
				attrs: {
					title,
					text,
					cancelText,
					confirmText,
					rejectText,
					closeButton,
					onConfirm() {
						close();
						resolve(true);
					},
					onClose() {
						close();
						resolve(false);
					},
					onReject() {
						close();
						resolve(null);
					}
				}
			});

			open();
		});
	};
}
