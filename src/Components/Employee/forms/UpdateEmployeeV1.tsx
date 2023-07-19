type UpdateEmployeeProps = { 
    update: boolean; 
    setIsModalOpen: () => void; 
    defaultValue: any; 
    employeeId?: string; 
}
const UpdateEmployeeV1 = ({update, setIsModalOpen, defaultValue, employeeId}: UpdateEmployeeProps) => {
    
    return <h1>update employee v1</h1>
}

export default UpdateEmployeeV1; 