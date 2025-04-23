import Image from "next/image";

interface ImageProps {
    src: string
}

const ImageProof = ({ src }: ImageProps) => {
    return (
        //<Image alt="" className="max-w-1/5" src={getImageSource(src)} />
        <div className="relative w-[200px] h-[200px]">
            <Image
                alt=""
                src={getImageSource(src)}
                fill
                style={{ objectFit: "cover" }}
                className="rounded-md shadow-md"
            />
        </div>
    )
}

const getImageSource = (data: string) => {
    const src = "data:image/jpeg;base64," + data;
    return src;
}

export default ImageProof;