---
layout: post
title: DNS error when adding a computer to a domain
categories: [windows]
tags: [windows, domain, dhcp, dns]
fullview: true
---

After having several problems with my laptop accessing files on my server (the domain controller for my domain), I had a look in the event log and found this error:

<pre>
The computer [computername] tried to connect to the server \\[servername] using the trust relationship established by the [domainname] domain. However, the computer lost the correct security identifier (SID) when the domain was reconfigured. Reestablish the trust relationship.
</pre>

I figured that this may be the cause of the problems and so set about reestablishing the trust relationship between the laptop and the server. Sounded like a simple task, but the only (easy) way I could find to do this was to remove the laptop from the domain and then add it again. After removing it successfully, I kept getting an error when trying to re-add it:

<pre>
The domain name [domainname] might be a NetBIOS domain name. If this is the case, verify that the domain name is properly registered with WINS.
If you are certain that the name is not a NetBIOS domain name, then the following information can help you troubleshoot your DNS configuration.
An error occurred when DNS was queried for the service location (SRV) resource record used to locate a domain controller for domain [domainname].
The error was: "No DNS servers configured for local system." (error code 0×0000267C DNS_ERROR_NO_DNS_SERVERS)
The query was for the SRV record for _ldap._tcp.dc._msdcs.[domain]”
</pre>

After puzzling for ages as to why it wasn't happy, I checked my IP settings and found the problem. Somehow, the IP settings had changed to a specified IP address instead of using DHCP. Changing them back solved the problem straight away.
