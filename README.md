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
 1. Navigate to ***/back-end/config*** and add **"gitignoredConstants.js"** file.
 2. Copy content of **"gitignoredConstants.example.js"** file and paste to newly created file.
 3. Replace *"USER"* and *"PASSWORD"* constants values with database credentials given by owner of the repository.  





#### Step 4: Change api localhost port, if needed (default - 3500)
1. Go to ***/back-end/config/constants.js*** and change the "PORT" constant.
2. Go to ***/front-end/frontend/config/urls.js*** and specify chosen port in "API_URL" constant.




#### Step 5: Start development servers
1. Navigate to ***/back-end*** and run  

        npm run dev

2. Navigate to ***/front-end/frontend*** and run  

        npm start


