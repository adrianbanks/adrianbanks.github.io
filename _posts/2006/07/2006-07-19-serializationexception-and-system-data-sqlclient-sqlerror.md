---
layout: post
date: 2006-07-10 00:10:00
title: SerializationException and System.Data.SqlClient.SqlError
categories: [dotnet]
tags: [dotnet, remoting, exception]
fullview: true
---

When remoting, it’s possible to get a strange exception if a `SQLException` occurs on the server.

The stack trace of the error is:

<pre class="stacktrace">
Exception: System.Runtime.Serialization.SerializationException  
Message: Member name ‘System.Data.SqlClient.SqlError server’ not found.  

Stack trace:
at System.Runtime.Serialization.Formatters.Binary.ReadObjectInfo.GetMemberTypes (String[] inMemberNames)  
at System.Runtime.Serialization.Formatters.Binary.ObjectMap..ctor(String objectName, String[] memberNames, BinaryTypeEnum[] binaryTypeEnumA, Object[] typeInformationA, Int32[] memberAssemIds, ObjectReader objectReader, Int32 objectId, BinaryAssemblyInfo assemblyInfo, SizedArray assemIdToAssemblyTable)  
at System.Runtime.Serialization.Formatters.Binary.ObjectMap.Create(String name, String[] memberNames, BinaryTypeEnum[] binaryTypeEnumA, Object[] typeInformationA, Int32[] memberAssemIds, ObjectReader objectReader, Int32 objectId, BinaryAssemblyInfo assemblyInfo, SizedArray assemIdToAssemblyTable)  
at System.Runtime.Serialization.Formatters.Binary.__BinaryParser.ReadObjectWithMapTyped(BinaryObjectWithMapTyped record)  
at System.Runtime.Serialization.Formatters.Binary.__BinaryParser.ReadObjectWithMapTyped(BinaryHeaderEnum binaryHeaderEnum)  
at System.Runtime.Serialization.Formatters.Binary.__BinaryParser.Run()  
at System.Runtime.Serialization.Formatters.Binary.ObjectReader.Deserialize(HeaderHandler handler, __BinaryParser serParser, Boolean fCheck, IMethodCallMessage methodCallMessage)  
at System.Runtime.Serialization.Formatters.Binary.BinaryFormatter.Deserialize (Stream serializationStream, HeaderHandler handler, Boolean fCheck, IMethodCallMessage   methodCallMessage)
at System.Runtime.Remoting.Channels.CoreChannel.DeserializeBinaryResponseMessage(Stream inputStream, IMethodCallMessage reqMsg, Boolean bStrictBinding)  
at System.Runtime.Remoting.Channels.BinaryClientFormatterSink.SyncProcessMessage(IMessage msg)
</pre>

What is actually happenning here is that the `System.Data.dll` on the client is a slightly different version to that on the server. When the `SQLException `is deserialised at the client end, there is a missing property on the client that cannot be deserialised.

This error usually occurs when remoting to a Windows 2003 Server box from a non-Windows 2003 client box. The client has a `System.Data.dll` of version 1.1.4322.2032. The server has a `System.Data.dll` of version 1.1.4322.2300. The difference is that the server property of the `SqlError` class is never set in v1.1.4322.2032, causing the serialisation error. More detailed info can be found on the [DevNewsGroups site](http://www.devnewsgroups.net/group/microsoft.public.dotnet.framework.adonet/topic21116.aspx).

Microsoft has two knowledge base articles, [KB884871](http://support.microsoft.com/kb/884871) and [KB887549](http://support.microsoft.com/kb/887549/), that pertain to this issue. The suggested solution is a .NET Framework 1.1 post-SP1 hotfix, but this is only available by [contacting Microsoft](http://support.microsoft.com/contactus/?ws=support) directly.

The hotfix solves the problem, but then stops old SqlError types from being deserialised, resulting in the exception:

<pre class="stacktrace">
Exception: System.Runtime.Serialization.SerializationException
Message: Wrong number of Members. Object System.Data.SqlClient.SqlError has 8 members, number of members deserialized is 7.

Stack trace:
at System.Runtime.Serialization.Formatters.Soap.ReadObjectInfo.PopulateObjectMembers()
at System.Runtime.Serialization.Formatters.Soap.ObjectReader.ParseObjectEnd(ParseRecord pr)
at System.Runtime.Serialization.Formatters.Soap.ObjectReader.Parse(ParseRecord pr)
at System.Runtime.Serialization.Formatters.Soap.SoapHandler.EndElement(String prefix, String name, String urn)
at System.Runtime.Serialization.Formatters.Soap.SoapParser.ParseXml()
at System.Runtime.Serialization.Formatters.Soap.SoapParser.Run()
at System.Runtime.Serialization.Formatters.Soap.ObjectReader.Deserialize(HeaderHandler handler, ISerParser serParser)
at System.Runtime.Serialization.Formatters.Soap.SoapFormatter.Deserialize(Stream serializationStream, HeaderHandler handler)
at System.Runtime.Serialization.Formatters.Soap.SoapFormatter.Deserialize(Stream serializationStream)
</pre>

This means that the hotfix is not backwards-compatible. The only way to get everything happy is to upgrade all Windows 2003 boxes to SP1 and all clients (Windows 2000 and Windows XP) to .Net 1.1 SP1 plus the hotfix.
