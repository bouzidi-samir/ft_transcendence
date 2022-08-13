import { useUserGetAllQuery } from "../generated";

interface guardProps {
    children: JSX.Element;
    excludeRoutes?: string[];
}

const Guard = ({ children, excludeRoutes }: guardProps) => {
    const { data: user } = useUserGetAllQuery();

    return <>(chidren)</>
};

export default Guard;

