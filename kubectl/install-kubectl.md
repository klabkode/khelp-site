# Kubernetes Installation

## Install Docker

```bash
sudo apt install docker.io
```

## Install Kubernetes

```bash
sudo apt-get install -y apt-transport-https ca-certificates curl
sudo curl -fsSLo /etc/apt/trusted.gpg.d/kubernetes-archive-keyring.gpg https://packages.cloud.google.com/apt/doc/apt-key.gpg
echo "deb [signed-by=/etc/apt/trusted.gpg.d/kubernetes-archive-keyring.gpg] https://apt.kubernetes.io/ kubernetes-xenial main" | sudo tee /etc/apt/sources.list.d/kubernetes.list
sudo apt-get update
sudo apt-get install -y kubelet kubeadm kubectl
sudo apt-mark hold kubelet kubeadm kubectl
```

## Install Minikube

```bash
curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64 -o /tmp/minikube
sudo install /tmp/minikube-linux-amd64 /usr/local/bin/minikube
```

## Verify installations

```bash
kubectl version
minikube version
```

## Start a cluster using the docker driver

```bash
minikube start --driver=docker
```

## Verify Minikube setup

```bash
docker ps # will list the running Minikube container
```

## Login Minkube

**Method 1:** `docker exec -it minkube bash`
**Method 2:** `minkube ssh`

## Get pods

**Method 1:** Get pods with Kubectl inside Minikube

```bash
minikube kubectl -- get pods
```

**Method 2:** Get pods with Kubectl in host

```bash
kubectl get pods
```

## Display Kubectl configs

```bash
kubectl config view
```

## Weblinks

<https://minikube.sigs.k8s.io/docs/start/>

<https://kubernetes.io/docs/setup/production-environment/tools/kubeadm/install-kubeadm/>
