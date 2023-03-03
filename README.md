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




#### Step 3: Add and configure gitignored constants
 1. Navigate to ***/back-end/*** and add **".env"** file.
 2. Copy content of **"/back-end/.env.example"** file and paste to newly created file.
 3. Replace *"USER"*, *"PASSWORD"*, *"ACCESS_TOKEN_SECRET"* and *"REFRESH_TOKEN_SECRET"* constants values with database credentials given by owner of the repository.  
 4. Change api localhost port, if needed (default - 3500).
 5. Navigate to ***/front-end/frontend*** and add **".env"** file.
 6. Copy content of **"/front-end/frontend.env.example"** file and paste to newly created file.
 7. Match api localhost port in *"REACT_APP_API_URL"* connection string with localhost port in the **"/back-end/.env"** file.
 8. Change front-end localhost port, if needed (default - 3000).




#### Step 4: Change api localhost port, if needed (default - 3500)
1. Go to ***/back-end/config/constants.js*** and change the "PORT" constant.
2. Go to ***/front-end/frontend/config/urls.js*** and specify chosen port in "API_URL" constant.




#### Step 5: Start development servers
1. Navigate to ***/back-end*** and run  

        npm run dev

2. Navigate to ***/front-end/frontend*** and run  

        npm start


