import * as icons from 'react-bootstrap-icons';

export const Icon = ({ iconName, ...properties }) => {
    const BootstrapIcon = icons[iconName];
    return <BootstrapIcon {...properties} />;
};
