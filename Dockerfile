FROM node

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the app dependencies
RUN npm install

# Copy the app source code to the container
COPY . .

# Set the environment variable for production
ENV NODE_ENV production

# Build the app
RUN npm run build

# Use an Nginx image to serve the built React app
FROM nginx:alpine
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Copy the built app to the Nginx web root directory
COPY --from=0 /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Run Nginx
CMD ["nginx", "-g", "daemon off;"]