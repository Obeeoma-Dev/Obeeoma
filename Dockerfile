

# Stage 1: Build the React application
FROM node:20-alpine AS build

# Set the working directory inside the container
WORKDIR /obeoma

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies 
RUN npm install --silent

# Copy the rest of the application source code
COPY . .

# Build the application (runs the 'build' script defined in package.json)
RUN npm run build


# Stage 2: Serve the static files with a lightweight web server (Nginx)
FROM nginx:alpine AS final

# Copy the built React application from the 'build' stage into Nginx's public folder
COPY --from=build /app/build /usr/share/nginx/html

#  Copy a custom Nginx configuration file (see Step 1.3)
 COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

# Expose the default Nginx HTTP port
EXPOSE 80

# The default Nginx CMD will start the server
CMD ["nginx", "-g", "daemon off;"]