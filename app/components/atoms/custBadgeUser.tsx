interface CustBadgeUserProps {
    insentif: boolean;
}

const CustBadgeUser = ({ insentif }: CustBadgeUserProps) => {
    return (
        <div className="flex items-center">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            <p className="text-sm font-semibold text-gray-700">User</p>
        </div>
    )
}

export default CustBadgeUser;