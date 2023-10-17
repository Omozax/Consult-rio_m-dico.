# Medical Office API

In this project, I developed a RESTful API for a Medical Office as part of a challenge for **CUBOS** school. The goal was to create an MVP (Minimum Viable Product) to list, create, update, delete, finish medical appointments, and list appointment reports. The data is stored in memory in the `database.js` file.

## Endpoints

Here are the main endpoints of the API:

- **List Medical Appointments**: `GET /appointments`
- **Create Medical Appointment**: `POST /appointment`
- **Update Appointment Data**: `PUT /appointment/:appointmentId/patient`
- **Delete Medical Appointment**: `DELETE /appointment/:appointmentId`
- **Finish Medical Appointment**: `POST /appointment/finish`
- **List Appointment Reports**: `GET /appointment/report`
- **List Doctor's Appointments**: `GET /appointments/doctor`

Each endpoint has its specific rules and validations, such as password verification, data validations, and appointment status control.

## Endpoint Verification

For those who want to check the API's endpoints, you can find the exported document with a URL at this [link](https://github.com/Omozax/Consult-rio_m-dico./blob/main/Insomnia_2023-10-16.json).

## Using the API

To facilitate the use of the API, you can use tools like [Insomnia](https://insomnia.rest/) or [Postman](https://www.postman.com/) to make requests and test the functionalities.

Please remember to follow best practices for authentication, input validation, and security when using this API in your projects.

![Exemplo de solicitação no Insomnia](https://github.com/Omozax/Consult-rio_m-dico./blob/main/Capture.PNG)
For those who want to check the API endpoints, you can find the exported document with a URL at this [link](https://github.com/Omozax/Consult-rio_m-dico./blob/main/Insomnia_2023-10-16.json).



---


## `search` Method - Overview

To assist in the development of this API, I have created a method called `search` that aims to facilitate the search for elements in a database. The method accepts various types of elements and offers flexibility in searches.

### `search` Function

Here is the code for the `search` method:

```javascript
function search(
  elements,
  database,
  property,
  returnIndex = false
) {
  if (!Array.isArray(elements)) {
    elements = [elements]; // Converts to an array if it's not already an array
  }

  for (let key in database) {
    const data = database[key];

    if (!data) continue;

    if (property && data[property]) {
      if (elements.includes(data[property].toString())) {
        return returnIndex ? key : data;
      }
    } else if (elements.includes(data)) {
      return returnIndex ? key : data;
    }
  }
  return null;
}
```

### What it does

The `search` method allows you to search for elements in a database based on a set of elements, properties, and criteria. It checks if the elements are found in the data's properties in the database and returns the first corresponding result. This is useful for flexible searches in various situations.

### Usage Examples

Here are some usage examples of the `search` method with different types of elements:

#### Example with Strings:

```javascript
const data = {
  1: { name: "Alice" },
  2: { name: "Bob" },
  3: { name: "Charlie" },
};

const result = search("Alice", data, "name");
// Result: { name: "Alice" }
```

#### Example with Numbers:

```javascript
const data = {
  1: { age: 25 },
  2: { age: 30 },
  3: { age: 35 },
};

const result = search(30, data, "age");
// Result: { age: 30 }
```

#### Example with Arrays:

```javascript
const data = {
  1: { colors: ["red", "blue"] },
  2: { colors: ["green", "yellow"] },
  3: { colors: ["red", "green"] },
};

const result = search(["red", "blue"], data, "colors");
// Result: { colors: ["red", "blue"] }
```

#### Example with Objects:

```javascript
const data = {
  1: { product: { name: "Laptop", price: 1000 } },
  2: { product: { name: "Smartphone", price: 500 } },
  3: { product: { name: "Tablet", price: 300 } },
};

const result = search({ name: "Smartphone", price: 500 }, data, "product");
// Result: { product: { name: "Smartphone", price: 500 } }
```

I hope this method is useful for programmers looking to perform flexible searches in their databases.

---
<div align="center">

[PT](https://github.com/Omozax/Consult-rio_m-dico./blob/main/README.md)

</div>
