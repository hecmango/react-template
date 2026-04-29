import { Toast } from 'primereact/toast';
import { useToastStore } from '../store/useToastStore';
import { useRef, useEffect } from 'react';

const ToastComponent = () => {

    const toast = useRef<Toast>(null);
    const message = useToastStore((state) => state.message);

    useEffect(() => {
        if (message && toast.current) {
            toast.current?.show(message);
        }
    }, [message]);

    if (!toast) {
        return null;
    }

    return (
        <Toast ref={toast} />
    )

}

export default ToastComponent;