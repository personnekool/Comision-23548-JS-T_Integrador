(function () {
  // Variable definition
  let fname = document.getElementById("fname");
  let lname = document.getElementById('lname');
  let email = document.getElementById('email');
  let quantity = document.getElementById('cantidad');
  let category = document.getElementById('categoria');
  let total = document.getElementById('total');
  let erase = document.getElementById('borrar');
  let resumen = document.getElementById('resumen');
  // Object to store information
  let values = {
    Nombre: '',
    Apellido: '',
    Email: '',
    Cantidad: 0,
    Categoria: ''
  };
/**
 * [Erase ticket input sale form]
 */
  function EraseForm() {
    fname.value = "";
    lname.value = "";
    email.value = "";
    quantity.value = "";
    category.value = "";
    total.value = "";
    lname.focus();
  }
  /**
   * [Validate name format using regex]
   * @param {[String]} arg1 [Chars in string between 1 and 10]
   */
  function TestString(text) {
    let regex = new RegExp("^([A-Za-z]){1,10}$");
    return regex.test(text);
  }
  /**
   * Test format error in Nombre and Apellido field
   * @param {[HTMLElement]} arg1 [Field to focus on error1] 
   */
  function AlertMsg1(nameField) {
    alert("Nombre muy extenso (max 10 caracteres) o formato incorrecto");
    nameField.focus();
  }
  /**
   * Test format error in rest of fields
   * @param {[HTMLElement]} arg1 [Field to focus on errro2]
   * @param {[String]} arg2 [String to define message in alert]
   */
  function AlertMsg2(nameField, nameText) {
    alert(nameText + " vacio. Digite valor.");
    nameField.focus();
  }
  /**
   * Alert user if error found in form
   * @param {[HTMLElement]} arg1 [Field in form] 
   */
  function Promtuser(field) {
    if (field.value === "") {
      AlertMsg2(field, field.name);
      return 1;
    } else if ((["Nombre","Apellido"].filter((x)=>{return x==field.name}).length > 0) && !TestString(field.value)) {
      AlertMsg1(field);
      return 1;
    }else if(field.name == "Cantidad" && ((field.value <= 0) || !Number.isInteger(Number.parseFloat(field.value)))){
      alert("Cantida debe ser mayro que cero y entera.");
      total.value = "";
      return 1;
    }else{
      values[field.name] = field.value;
      return 0;
    }
  }
  /**
   * Calculate total ticket cost according to categroy discount
   * @param {[String]} arg1 [Ticket Category: Student, Trainee, Junior] 
   * @param {[Integer]} arg2 [Ticket quantity] 
   * @returns 
   */
  function PrintTotal(category, quantity){
    let discount = 0;
    switch (category) {
      case "Estudiante":
        discount = 0.8;
        break;
      case "Trainee":
        discount = 0.5;
        break;
      case "Junior":
        discount = 0.15;
        break;
      default:
        break;
    }
    return Math.ceil(200 * quantity * (1-discount));
  }

  // Buttons Event Listeners
  erase.addEventListener('click', EraseForm);
  resumen.addEventListener('click', () => {
    let control = 0;
    control += Promtuser(category);
    control += Promtuser(quantity);
    control += Promtuser(email);
    control += Promtuser(fname);
    control += Promtuser(lname);
    if(control == 0){
      let totalValue = PrintTotal(category.value, quantity.value)
      total.value = `Total a pagar: \$ ${totalValue}`;
    }
  });

})();