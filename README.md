# Socket.io Çoklu Matematik Oyunu

Socket.io ve React kazanımlarını geliştirmek için oluşturulmuştur.

![](https://media.giphy.com/media/qnc8GiUz9V559QpY6q/giphy.gif)

## `socket.io`
Server ile client arasında bilgi alış verişini sağlayan bir soket kütüphanesidir. 
HTTP isteklerinden farklı olarak sunucudan istemciye bir olay sonucu veri gönderebilir.
Ayrıntılı socket.io 3.0 için https://socket.io/ inceleyiniz.

## `tailwind css`
tailwind özelleştirilebilir özelleştirilebilir bir CSS yardımcı araç kütüphanesidir.
css stillerini içeren kısayollar barındırır.
index.html dosyasına <link href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css" rel="stylesheet"> eklemeyi unutmayınız.
Ayrıntılı tailwind için https://tailwindcss.com/docs/installation#using-tailwind-via-cdn inceleyiniz.

## Çalıştır
**git clone [project]** - Projeyi indir 

**cd [project-name]** - Proje dizinine gir

**npm i** - Gerekli kütüphaneleri ekle

**npm run build** Projeyi build et

**node server.js** Socket.io server açılıştır

**yarn start** Projeyi çalıştır

Server <a href="localhost:4000" rel="nofollow">localhost:4000</a> proje default <a href="localhost:3000" rel="nofollow">localhost:3000</a> adresinde çalışır.
Cors hatasını önlemek için server.js line:3 col:1 var olan proje adresini değiştiriniz.

<pre>const io = require('socket.io')(http, { cors: { origin: "http://localhost:3000", credentials: true } });</pre>

<a href="https://www.youtube.com/channel/UCeU-1X402kT-JlLdAitxSMA" rel="nofollow">Kaynak</a>
