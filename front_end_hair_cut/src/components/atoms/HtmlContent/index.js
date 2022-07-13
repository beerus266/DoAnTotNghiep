import cn from "classnames";

const HtmlContent = ({ html, className, tag: Tag = 'div', ...rest }) => {
    return (
        <Tag
            className={cn(className)}
            dangerouslySetInnerHTML={{ __html: html }}
            {...rest}
        />
    )
}

export default HtmlContent;