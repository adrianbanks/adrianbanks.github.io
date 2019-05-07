---
layout: post
title: FIPS Compatible Crypto
categories: []
tags: []
fullview: true
---

https://medium.com/@pnpasif/enabling-fips-140-2-on-windows-10-520673c030a9

KeyedHashAlgorithm       works
MD5                      fails
MD5Cng                   fails
HMACMD5                  works
RIPEMD160                fails
RIPEMD160Managed         fails
HMACRIPEMD160            works
SHA1                     works
SHA1Cng                  works
SHA1Managed              works
HMACSHA1                 works
SHA256                   works
SHA256Cng                works
SHA256Managed            works
HMACSHA256               works
SHA384                   works
SHA384Cng                works
SHA384Managed            works
HMACSHA384               works
SHA512                   works
SHA512Cng                works
SHA512Managed            works
HMACSHA512               works
Aes                      works
AesManaged               works
TripleDES                works
MACTripleDES             works
Rijndael                 fails
Rijndael(named)          works
RijndaelManaged          fails
RijndaelManaged(named)   works
IsolatedStorage          works
