//para convertir una imagen a base64
export const convertirBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            let base64data = reader.result;
            base64data = base64data.replace(/^data:image\/(png|jpg);base64,/, '');
            resolve(base64data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
};