import type { ReactNode } from 'react';

const SubNavigation = ({ children }: { children: ReactNode }) => {
    return <div className="flex justify-center gap-x-4 mb-12">{children}</div>;
};

export default SubNavigation;
