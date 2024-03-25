const url: string = "https://api.thecatapi.com/v1/images/search";
const button: HTMLButtonElement | null = document.querySelector("button"); // this button's value can be null
const tableBody: HTMLTableElement | null =
  document.querySelector("#table-body");

/*
In TypeScript, when you're working with DOM elements, such as retrieving them using methods like document.querySelector, the TypeScript compiler provides type definitions for these elements to offer better type safety and tooling support.
The HTMLButtonElement type is part of these type definitions, which are provided by TypeScript's DOM library. This library includes types for various DOM elements, events, and other features, allowing you to write TypeScript code that interacts with the DOM in a type-safe manner.
So, when you see HTMLButtonElement in TypeScript code, it's referring to the type definition for HTML button elements provided by TypeScript's DOM library, ensuring that the compiler checks that you're working with button elements correctly and providing type information for better code completion and error checking.
*/
/*we can define class in this way, or we can use interface
class Cat {
  id: string;
  url: string;
  height: number;
  width: number;

  constructor(id: string, url: string, height: number, width: number) {
    this.id = id;
    this.url = url;
    this.height = height;
    this.width = width;
  }
}*/
//The implements keyword is used to indicate that a class intends to implement the structure defined by an interface. When a class implements an interface, it promises to provide definitions for all the properties and methods specified by that interface.
interface CatType {
  id: string;
  url: string;
  height: number;
  width: number;
  optional?: boolean;
}

class Cat implements CatType {
  id: string;
  url: string;
  height: number;
  width: number;

  constructor(id: string, url: string, height: number, width: number) {
    this.id = id;
    this.url = url;
    this.height = height;
    this.width = width;
  }
}

//Create another class for display
class WebDisplay {
  //create a function, argument data is from API
  //✅Public Modifier:The public modifier is an access modifier that specifies that a class member (property or method) is accessible from outside the class.
  //✅Static Modifier:The static modifier is used to define class members that belong to the class itself rather than to individual instances of the class.
  public static addData(data: CatType): void {
    // use interface here⬆️
    //✅void is a type that represents the absence of a value. It is commonly used to indicate that a function does not return any value or that a variable can only be assigned undefined or null.
    const cat: Cat = new Cat(data.id, data.url, data.height, data.width);
    //⬆️Using a class as a type provides type safety and ensures that variables, parameters, and return values adhere to the structure and behavior defined by the class.
    //create another table row
    const tableRow: HTMLTableRowElement = document.createElement("tr");
    // add value from api
    //use toString() convert number to string
    tableRow.innerHTML = `
            <td>${cat.id}</td>
            <td><img src="${cat.url}" /></td>
            <td>${cat.height.toString()}</td>
            <td>${cat.width.toString()}</td>
            <td>${cat.url}</td>
            <td><a href="#">X</a></td>
        `;
    //Add this row into table body, use ? as body could be null
    tableBody?.appendChild(tableRow);
    }
    public static deleteData(deleteButton: HTMLAnchorElement):void {
        const td = deleteButton.parentElement as HTMLTableCellElement;
        const tr = td.parentElement as HTMLTableRowElement;
        tr.remove()
    }
}
//API function
async function getJSON<T>(url: string):Promise<T> {
  //https://developer.mozilla.org/en-US/docs/Web/API/Response/Response
  const response: Response = await fetch(url);
  const json:Promise<T> = await response.json();//no idea what's the data type of this promise
  return json;
}

async function getData():Promise<void> {
    try {
        const json:CatType[]= await getJSON<CatType[]>(url);
        const data:CatType= json[0];
        WebDisplay.addData(data);
    }
    catch (error: Error | unknown) {
        let message: string;
        if (error instanceof Error) {
            message = error.message
        } else {
            message = String(error);
        }
        console.log(error)
    }
}

button?.addEventListener<"click">("click", getData);
/*
Generic Type Parameter for Event Type (<'click'>):

TypeScript allows you to specify a generic type parameter for event listeners to provide type safety.
In this case, <'click'> specifies that the event type for the listener is 'click'.
This ensures that TypeScript provides type checking for event-related properties and methods inside the event handler function.
*/
tableBody?.addEventListener<"click">("click", (e:MouseEvent) => {
    WebDisplay.deleteData(e.target as HTMLAnchorElement)
    //WebDisplay.deleteData(<HTMLAnchorElement>e.target as HTMLAnchorElement)
});