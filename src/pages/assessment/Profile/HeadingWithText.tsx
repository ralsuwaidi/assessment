
interface HeadingWithTextTypes{
    heading: string;
    text?: string;
}

const HeadingWithText = ({ heading, text }: HeadingWithTextTypes) => {
    return (
        <div className="mt-4 pt-2 border-top">
        <h4 className="mb-3 fs-15">{heading}</h4>
        <p className="text-muted mb-3">{text}</p>
    </div>
    )
}

export default HeadingWithText;