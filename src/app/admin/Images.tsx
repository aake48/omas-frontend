

interface ImagesProps {
    images: string | undefined
}

const Images = ({ images }: ImagesProps) => {
    
    if (images) console.log(images);

    if (!images) return (
        <div>

        </div>
    )

    return (
        <div>
            <img src={"data:image/jpeg;," + (images)}></img>
        </div>
    )
}

export default Images;