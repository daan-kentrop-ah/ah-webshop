# AH Webshop

This is repository contains a small demo application of an Albert Heijn webshop with functionality to add products to a
shopping cart and persist the cart content in a database. The goal of this project is to learn about containerization
and deployment of a web application using podman/docker and Kubernetes.

## Stack

### Frontend

The frontend of this application is built with NEXT.js in TypeScript. For styling and UI components tailwind and shadcn
are used.

### Backend

The backend of this application is built with Spring Boot in Kotlin.

### Database

The application uses a Postgres database to store products and shopping cart content. The database is filled with
initial products and a user via dataseeders in the backend.

## Steps

This describes the steps taken to make this application run locally and in a Kubernetes cluster.

### Phase 0

- Installed k3d and setup a cluster to be able to run k3s

```shell
brew install k3d

k3d cluster create mycluster

kubectl get nodes # to check if the cluster is running
```

### Phase 1

#### Frontend

Create a new Next.js project using create next app:

```shell
npx create-next-app@latest 
```

Used the recommended settings and added TypeScript support. Then installed shadcn for UI components.

#### Backend

Used spring boot initalizer to create a new project and put it in the backend folder. Added dependencies for Spring Web,
Spring Data JPA, and Postgres Driver.

#### Database

Setup a postgres database by using a docker compose file.

### Phase 2

Wrote docker files for the backend and frontend. Sources used:

- [Containerize a Next.js application - docker docs](https://docs.docker.com/guides/nextjs/)
- [Spring Boot with Docker - Spring docs](https://spring.io/guides/gs/spring-boot-docker)

Build the frontend image using:

```shell
podman build -t ah-webshop-frontend:1.0 ./frontend
```

Build the backend image using:

```shell
mvn clean package -DskipTests

podman build -t ah-webshop-backend:1.0 ./backend
```

Setup a main docker compose to create containers with the build images and a Postgres image from docker.

Fixed a problem with the backend not correctly connection to the backend while starting up. To fix this I implemented a
health check in the database and used ```depends_on```.
(https://blog.gntech.me/posts/2026-05-26-docker-healthchecks-compose-service-readiness/)

### Phase 3

I already installed k3d in phase 0 so it was already running here.

Imported the frontend and backend images into the k3d cluster using:

```shell
k3d image import localhost/ah-webshop-frontend:1.0 -c mycluster
k3d image import localhost/ah-webshop-backend:1.0 -c mycluster
```

### Phase 4

Wrote a manifest file for the frontend.
https://kubernetes.io/docs/concepts/overview/working-with-objects/labels/
https://www.geeksforgeeks.org/cloud-computing/docker-working-with-kubernetes/
https://dev.to/prodevopsguytech/writing-kubernetes-manifests-from-beginner-to-advanced-31bg
https://spacelift.io/blog/kubernetes-manifest-file

Had some problems with accessing the frontend in my browser. I was using the
LoadBalancer service type but it was not working. I changed it to NodePort and it worked.
https://www.geeksforgeeks.org/devops/kubernetes-nodeport-service/
https://k3d.io/v5.0.0/usage/exposing_services/#2-via-nodeport

I exposed the frontend port to exterrnal by using this command:

```shell
k3d cluster edit mycluster --port-add "3000:30080@server:0"
```

This maps external port 3000 to internal port 30080 on the server node. @server:0 is k3d syntax to specify the first
server node in the cluster.

Then i copied the frontend manifest to create a backend manifest. I change the labels, ports, env variables and image.

I applied the manifests to the cluster using:

```shell
kubectl apply -f k8s
```

When I needed to restart a specific deployment I used this commands:

```shell
kubectl rollout restart deployment/backend-deployment
kubectl rollout restart deployment/frontend-deployment
kubectl rollout restart deployment/database-deployment
```

The backend pod was not starting because it could not connect to the database. So I needed to add the database to the
cluster. I created a manifest for the database the same way as the frontend and backend. Then applied the new manifests.
I did not work immediately because I was still using the urls from the docker compose which where based on the docker
network. I changed the urls to use the service names of the database and backend. After that it worked.

I hardcoded the env variables in the manifest so the next step was using secrets to store the env variables. I did this
by change the name and value pairs to valueFrom.

https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/#define-a-container-environment-variable-with-data-from-a-single-secret

Then I created a secret from a .env file using the command:

```shell
kubectl create secret generic webshop-secrets --from-env-file=k8s/.env
```

https://kubernetes.io/docs/reference/kubectl/generated/kubectl_create/kubectl_create_secret_generic/

to not have to run the command I added a kustomization.yaml file to the k8s folder. This uses Kustomize to create the
secret from the .env file and apply all manifests in the k8s folder. I can now run this command to apply all manifests
and create the secret:

```shell
kubectl apply -k k8s
```
(only change is -k instead of -f)

