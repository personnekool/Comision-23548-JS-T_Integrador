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

  // Closure implementation
  // In a real project, this API should go in another file
  function TicketAPI() {
    let values = {
      Nombre: '',
      Apellido: '',
      Email: '',
      Cantidad: 0,
      Categoria: ''
    };
    /**
     * [Validates if HTMLElement value is empty]
     * [Scope: Private]
     * @param {HTMLElement}
     * @returns {boolean}
     */
    function IsEmpty(arg) {
      return arg.value.length === 0;
    }
    /**
    * [Validate name format using regex and length between 1 and 10 characters]
    * [Scope: Private]
    * @param {String}
    * @returns {boolean}
    */
    function IsTextString(arg) {
      return new RegExp("^([A-Za-z]){1,10}$").test(arg.value);
    }
    /**
     * [Validate if arg HTMLElement.name is in array]
     * [Scope: Private]
     * @param {Array} array 
     * @param {HTMLElement} arg 
     * @returns {boolean}
     */
    function AreFields(array, arg) {
      return array.filter((x) => { return x == arg.name }).length > 0;
    }
    /**
     * 
     * @param {*} arg 
     * @returns {boolean}
     */
    function IsPositiveIntegerQuantity(arg) {
      return (new RegExp(",").test(arg.value)) || (arg.value <= 0) || !(Number.isInteger(Number.parseFloat(arg.value)));
    }
    /**
    * [Message format error in Nombre and Apellido field]
    * [Scope: Private]
    * @param {HTMLElement} arg1 [Field to focus on error1]
    * @param {String} arg2 [HTMLElement string name]
    */
    function AlertMsg1(nameField, nameText) {
      alert(`${nameText} muy extenso (max 10 caracteres) o formato incorrecto`);
      nameField.focus();
    }
    /**
    * [Message format error if field content is empty]
    * [Scope: Private]
    * @param {HTMLElement} arg1 [Field to focus on error1]
    * @param {String} arg2 [HTMLElement string name]
    */
    function AlertMsg2(nameField, nameText) {
      alert(nameText + " vacio. Digite valor.");
      nameField.focus();
    }
    /**
    * [Message format error in cantidad field]
    * [Scope: Private]
    * @param {HTMLElement} arg1 [Field to focus on error1]
    * @param {String} arg2 [HTMLElement string name]
    */
    function AlertMsg3(nameField, nameText) {
      alert(`${nameText} debe ser positiva y entera.`);
      nameField.focus();
    }
    /**
    * [Calculate total ticket cost according to categroy discount]
    * [Scope: Public]
    * @param {String} arg1 [Ticket Category: Student, Trainee, Junior] 
    * @param {Integer} arg2 [Ticket quantity] 
    * @returns {Integer}
    */
    function PrintTotal(category, quantity) {
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
      return Math.ceil(200 * quantity * (1 - discount));
    }
    /**
    * Alert user if error found in form or set value in ticket
    * If return value is > 0, it means there is a validatio error
    * [Scope: Public]
    * @param {HTMLElement} arg1 [Field in form] 
    * @returns {Integer}
    */
    function PromtUser(field) {
      if (IsEmpty(field)) {
        AlertMsg2(field, field.name);
        return 1;
      } else if (AreFields(["Nombre", "Apellido"], field) && !IsTextString(field)) {
        console.log(IsTextString(field));
        AlertMsg1(field, field.name);
        return 1;
      } else if (AreFields(["Cantidad"], field) && IsPositiveIntegerQuantity(field)) {
        AlertMsg3(field, field.name);
        return 1;
      } else {
        values[field.name] = field.value;
        return 0;
      }
    }

    let publicAPI = {
      PromtUser: PromtUser,
      PrintTotal: PrintTotal
    };
    return publicAPI;
  }

  let ticketForm = TicketAPI();
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
  // Buttons Event Listeners
  erase.addEventListener('click', EraseForm);
  resumen.addEventListener('click', () => {
    let control = 0;
    control += ticketForm.PromtUser(category);
    control += ticketForm.PromtUser(quantity);
    control += ticketForm.PromtUser(email);
    control += ticketForm.PromtUser(fname);
    control += ticketForm.PromtUser(lname);
    if (control == 0) {
      let totalValue = ticketForm.PrintTotal(category.value, quantity.value)
      total.value = `Total a pagar: \$ ${totalValue}`;
    }
  });

})();