[<img alt="Deployed with FTP Deploy Action" src="https://img.shields.io/badge/Deployed With-FTP DEPLOY ACTION-%3CCOLOR%3E?style=for-the-badge&color=2b9348">](https://github.com/SamKirkland/FTP-Deploy-Action)
# revealgraphs
Integrate python generated graphs in reveal.js-presentation
* graphs generated in Jupyter notebook
* exported to presentation/graphs
* slides in presentation/index.html
* presentation deployed as static website with github actions. 
  * see .github/workflows/main.yml
  * action secrets:
    * `ftp_server`
    * `ftp_user`
    * `ftp_password`
## Setup
### reveal.js
1. Download the latest reveal.js version https://github.com/hakimel/reveal.js/archive/master.zip
2. Unzip into presentation

### Python Environment
**Install** conda environment:
```sh
$ conda env create -f revealgraphs.yml
```
**Update** the environment with new packages/versions:
1. modify revealgraphs.yml
2. run `conda env update`:
```sh
$ conda env update --name revealgraphs --file revealgraphs.yml --prune
```
`prune` uninstalls dependencies which were removed from revealgraphs.yml

**Use** environment:
before working on the project always make sure you have the environment activated:
```sh
$ conda activate revealgraphs
```
