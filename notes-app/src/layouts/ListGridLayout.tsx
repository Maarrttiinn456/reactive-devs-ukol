import type { ReactNode } from 'react';

const ListGridLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">{children}</div>
    );
};

export default ListGridLayout;
