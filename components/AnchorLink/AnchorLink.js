import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { getAnchor } from '../../utils/anchor';

const CustomLink = ({ anchor, size }) => {
    const router = useRouter();
    const [slug, setSlug] = React.useState('');
    const[currentpath, setCurrentPath] = React.useState('');
    React.useEffect(() => {
        setSlug(router.query.slug);
        setCurrentPath(router.pathname);
    }, []);
    return (
        <Link 
            href={{
                pathname: currentpath,
                query: {
                    slug: slug,
                },
                hash: anchor
            }}
        >
            <a className={'absolute top-14 left-0 transform -translate-x-full opacity-0 group-hover:opacity-100 p-1'} style={{color: '#A1A1AA', textDecoration: 'none'}}>
                <svg width={`${2.5-0.25*size}rem`} height={`${2.5-0.25*size}rem`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 20l4-16m2 16l4-16M6 9h14M4 15h14" />
                </svg>
            </a>
        </Link>
    );
}

const Heading = ({ size, children }) => {
    const Tag = `h${size}`;
    const anchor = getAnchor(children);
    return (
        <Tag id={anchor} className={'group relative'} style={{marginTop: '-3.5rem', paddingTop: '3.5rem'}}>
            <CustomLink anchor={anchor} size={size}/>
            {children}
        </Tag>
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

