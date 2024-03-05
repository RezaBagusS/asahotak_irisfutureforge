interface CustBadgeUserProps {
    insentif: boolean;
}

const CustBadgeUser = ({ insentif }: CustBadgeUserProps) => {

    const badge = insentif ? "Intensif" : "Reguler";

    return (
        <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
            <p className="text-sm font-semibold text-gray-700">{badge}</p>
        </div>
    )
}

export default CustBadgeUser;