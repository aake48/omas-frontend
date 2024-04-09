
interface ImageProps {
    src: string
}

const ImageProof = ({ src }: ImageProps) => {
    return (
        <img className="max-w-1/5" src={getImageSource(src)} />
    )
}

const getImageSource = (data: string) => {
    const src = "data:image/jpeg;base64," + data;
    return src;
}

export default ImageProof;