import Link from 'next/link';
import React from 'react';
import useLink from '../hooks/useLink';

type CustomLinkProps = {
    anchor: string;
    size: number;
}

const LinkBase = React.forwardRef<any, { size: number }>(({ size }, ref) => {
    return (
        <a ref={ref} className={'absolute top-0 left-0 transform -translate-x-full opacity-0 group-hover:opacity-100 focus:opacity-100 duration-75 p-1 !text-blog-gray-400 !no-underline'}>
            <svg width={`${2.5-0.25*size}rem`} height={`${2.5-0.25*size}rem`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
            </svg>
        </a>
    )
})

const CustomLink = ({ anchor, size }: CustomLinkProps) => {
    const link = useLink();
    return (
        <>
            {link ?
            <Link href={{...link, hash: anchor}} passHref>
                <LinkBase size={size}/>
            </Link> :
            <LinkBase size={size} />}
        </>
    );
}

type HeadingProps = {
    size: number;
    children: string;
    id: string;
}

const Heading = ({ size, children, id }: HeadingProps) => {
    const Tag = `h${size}`;
    const DynamicHeading = ({ children, ...props }) => React.createElement(Tag, {...props}, children);
    return (
        <>
            <DynamicHeading id={id} className={'group relative'}>
                <CustomLink anchor={id} size={size}/>
                {children}
            </DynamicHeading>
        </>
    );
};

const AnchorLink = {
    h1: props => <Heading {...props} size={1} />,
    h2: props => <Heading {...props} size={2} />,
    h3: props => <Heading {...props} size={3} />,
    h4: props => <Heading {...props} size={4} />,
    h5: props => <Heading {...props} size={5} />,
    h6: props => <Heading {...props} size={6} />,
}

export default AnchorLink;

