const http = require('http');
const fs = require('fs');
const url = require('url');
const qs = require('querystring');



let artikli = [
    {
        "id": 1,
        "naziv": "Artikal1",
        "cena": 1000,
        "imeKompanije": "Kompanija1 doo"
    },
    {
        "id": 2,
        "naziv": "Artikal2",
        "cena": 1500,
        "imeKompanije": "Kompanija2 doo"
    },
    {
        "id": 3,
        "naziv": "Artikal3",
        "cena": 2000,
        "imeKompanije": "Kompanija3 doo"
    }
];



const server = http.createServer(function (request, response) {
    let urlObj = url.parse(request.url, true, false);
    if (request.method == 'GET') {

        if (urlObj.pathname == '/') {
            fs.readFile('index.html', function (err, data) {
                if (err) {
                    response.writeHead(404);
                    response.end(JSON.stringify(err));
                    return;
                }
                response.writeHead(200, { 'Content-Type': 'text/html' });
                response.end(data);
            })
        }

        if (urlObj.pathname == '/sviArtikli') {

            var body = '';
            request.on('data', function (data) {
                body += data;
            });
            request.on('end', function () {
                prosledjenoIme = qs.parse(body)
                response.writeHead(200)
                response.end(sviArtikli(prosledjenoIme.imeKompanije));
                console.log("Prikazani svi artikli");
            });
        }
    }



    if(request.method == 'POST'){

        if (urlObj.pathname == "/dodajArtikal") {
            var body = '';
            request.on('data', function (data) {
                body += data;
            });
            request.on('end', function () {
                artikal = qs.parse(body)
                response.writeHead(200)
                response.end(dodajArtikal(artikal.id, artikal.naziv, artikal.cena, artikal.imeKompanije));
                console.log("Dodat artikal!");
            });
        }

        if (urlObj.pathname == "/obrisiArtikal") {
            var body = '';
            request.on('data', function (data) {
                body += data;
            });
            console.log(body);
            request.on('end', function () {
                artikal = qs.parse(body);
                response.writeHead(200)
                response.end(obrisiArtikal(artikal.id));
                console.log("Obrisan artikal!");
            });

        }


        if (urlObj.pathname == "/izmeniArtikal") {
            var body = '';
            request.on('data', function (data) {
                body += data;
            });
            request.on('end', function () {
                artikal = qs.parse(body)
                response.writeHead(200)
                response.end(izmeniArtikal(artikal.id, artikal.naziv, artikal.cena, artikal.imeKompanije));
                console.log("Izmenjen artikal!");
            });
        }
    }
});

    const port = 6000;
    const host = 'localhost';

    server.listen(port, host);
    console.log(`Server na adresi: http://${host}:${port}`);


    function dodajArtikal(id, naziv, cena, imeKompanije) {
        let artikal = {
            'id': id,
            'naziv': naziv,
            'cena': cena,
            'imeKompanije': imeKompanije
        };
        artikli.push(artikal);
    }


    function sviArtikli(imeKompanije) {
        if(imeKompanije=="")
            return JSON.stringify(artikli);
        else{
            pomocni = []
            for (let i=0;i<artikli.length;i++){
                if (artikli[i].imeKompanije == imeKompanije)
                    pomocni.push(artikli[i]);
            }
            return JSON.stringify(pomocni);
        }
    }


    function obrisiArtikal(id) {
        let pomocni = []
        for(let i=0;i<artikli.length;i++){
            if(artikli[i].id != id){
                pomocni.push(artikli[i])
            }
            else{
                artikal = artikli[i];
            }
        }
        artikli = pomocni
        return "Obrisan artikal:\n" + JSON.stringify(artikal);
    }


    function izmeniArtikal(id, naziv, cena, imeKompanije) {
        let artikal = {
            'id': id,
            'naziv': naziv,
            'cena': cena,
            'imeKompanije': imeKompanije
        };
        for (let i=0;i<artikli.length;i++){
            if(artikli[i].id == id)
                {
                    artikli[i].naziv = naziv;
                    artikli[i].cena = cena;
                    artikli[i].imeKompanije = imeKompanije;
                }
        };
    }

