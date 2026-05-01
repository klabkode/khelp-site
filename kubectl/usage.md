# Kubectl Usage

```bash
kubectl apply -f <manifest.yaml>                    # create resource(s)
kubectl get pods -n <namespace>                     # List pods/running containers
kubectl exec -it -n <namespace> <podname> -- bash   #Login to the specific pods
```

## Bash aliases and functions

```bash
alias kbapply='kubectl apply -f'
alias kbdelete='kubectl delete -f'

kbash() {
        kubectl -n uct exec -it $1 -- bash
}

kblog() {
        kubectl -n uct logs $1
}

kbget() {
        kubectl -n uct get pods
}

kbdesc() {
        kubectl -n uct describe pods $1
}
```
