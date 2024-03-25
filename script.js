"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const url = "https://api.thecatapi.com/v1/images/search";
const button = document.querySelector("button"); // this button's value can be null
const tableBody = document.querySelector("#table-body");
class Cat {
    constructor(id, url, height, width) {
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
    static addData(data) {
        // use interface here⬆️
        //✅void is a type that represents the absence of a value. It is commonly used to indicate that a function does not return any value or that a variable can only be assigned undefined or null.
        const cat = new Cat(data.id, data.url, data.height, data.width);
        //⬆️Using a class as a type provides type safety and ensures that variables, parameters, and return values adhere to the structure and behavior defined by the class.
        //create another table row
        const tableRow = document.createElement("tr");
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
        tableBody === null || tableBody === void 0 ? void 0 : tableBody.appendChild(tableRow);
    }
}
//API function
function getJSON(url) {
    return __awaiter(this, void 0, void 0, function* () {
        //https://developer.mozilla.org/en-US/docs/Web/API/Response/Response
        const response = yield fetch(url);
        const json = yield response.json(); //no idea what's the data type of this promise
        return json;
    });
}
function getData() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const json = yield getJSON(url);
            const data = json[0];
            WebDisplay.addData(data);
        }
        catch (error) {
            let message;
            if (error instanceof Error) {
                message = error.message;
            }
            else {
                message = String(error);
            }
            console.log(error);
        }
    });
}
button === null || button === void 0 ? void 0 : button.addEventListener("click", getData);
