class Validator {
    validateInputs(inputData) {
        let errorMsg = "";
        if(!inputData.name) {
            errorMsg +="Please enter name of this item.\n"
        }
        if(inputData.age.toString().match(/[^0-9]/g)) {
            errorMsg +="Age must be a number.\n"
        }
        if(inputData.price.toString().match(/[^0-9]/g)) {
            errorMsg +="Price must be a number.\n"
        }
        if(errorMsg.length === 0){
            return true;
        } else {
            alert(errorMsg);
            return false;
        }
    }
}
export default Validator