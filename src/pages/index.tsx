import { NextPage } from 'next';
import Home from 'modules/home/home';

const HomeRedirect: NextPage = () => {
    // @ts-ignore
    return <Home />;
};

export default HomeRedirect;
