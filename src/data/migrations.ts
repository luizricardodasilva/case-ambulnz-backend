import { connection } from "./connection"

const printError = (error: any) => { console.log(error.sqlMessage || error.message) }

const createTable = () => connection.raw(`
    CREATE TABLE IF NOT EXISTS LabePizza (
        id VARCHAR(255) PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        price FLOAT NOT NULL,
        ingredients VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS LabePizza_Orders (  
        id VARCHAR(255) PRIMARY KEY,
        pizza_id VARCHAR(255) NOT NULL,
        quantity INT NOT NULL,
        total_price FLOAT NOT NULL,
        FOREIGN KEY (pizza_id) REFERENCES LabePizza (id)
    );   
`)
    .then(() => { console.log("Created Tables!") })
    .catch(printError)

const insertUsers = () => connection.raw(`
    INSERT INTO LabePizza (id, name, price, ingredients) VALUES (1,'4 Queijos','9','Catupiry, Mussarela, Provolone e Parmessão');
    INSERT INTO LabePizza (id, name, price, ingredients) VALUES (2,'Baiana','8','Calabresa Moída, Pimenta, Bacon e Cebola');
    INSERT INTO LabePizza (id, name, price, ingredients) VALUES (3,'Frango com Catupiry','7.5','Frango e Catupiry');
    INSERT INTO LabePizza (id, name, price, ingredients) VALUES (4,'Portuguesa','9','Mussarela, Presunto, Ovos, Ervilha e Cebola');
    INSERT INTO LabePizza (id, name, price, ingredients) VALUES (5,'Romeu e Julieta','10','Goiabada e Mussarela');
`)
    .then(() => { console.log("Created Pizzas!") })
    .catch(printError)

const closeConnection = () => { connection.destroy() }

createTable()
    .then(insertUsers)
    .finally(closeConnection)