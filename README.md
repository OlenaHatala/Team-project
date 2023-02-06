# Team-project



### How to run localy

#### Step 1: Clone repository
1. Clone repository to your local machine by running  

        git clone https://github.com/OlenaHatala/Team-project.git  

in the chosen directory.



#### Step 2: Add dependencies
1. Navigate to ***/back-end*** and run  

        npm install

1. Navigate to ***/front-end/frontend*** and run  

        npm install  




#### Step 3: Add and configure .env
 1. Navigate to ***/back-end*** and add **".env"** file.
 2. Copy content of **".env.example"** file and paste to **".env"**.
 3. Replace *"USER"* and *"PASSWORD"* variables values with database credentials given by owner of the repository.  
 4. If you have trouble connecting to database and get this error:

        An error occurred: bad auth : Authentication failed.  
    you can try insert hard-coded values in places where .env file is used.
    To do this follow next steps:
     1. Go to ***/back-end/db.js*** and replace `${process.env.USER}:${process.env.PASSWORD}` with `<YOUR_DB_USERNAME>:<PASSWORD>` in the following line:

                const localDB = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@clusterqa.dhdgpcl.mongodb.net/tableDB?retryWrites=true&w=majority`  




#### Step 4: Change api localhost port, if needed (default - 3500)
1. Go to ***/back-end/config/constants.js*** and change the "PORT" constant.
2. Go to ***/front-end/frontend/config/urls.js*** and specify chosen port in "API_URL" constant.




#### Step 5: Start development srvers
1. Navigate to ***/back-end*** and run  

        npm run dev

2. Navigate to ***/front-end/frontend*** and run  

        npm start


