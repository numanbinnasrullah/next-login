export const ShowError = (errors, name) => {
   
    const exist = errors.find(err => err.param === name);
    if(exist){
        console.log("errors",exist.msg)
        return exist.msg
    }else {
        return false;
    }
}