FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build-env
WORKDIR /app
COPY . ./
RUN dotnet restore 
RUN dotnet publish -c Release -o out
#RUN mkdir ./out/db

FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime
WORKDIR /runtime-app
COPY --from=build-env /app/out .

COPY certs/energia.pfx /https/energia.pfx

ENV ASPNETCORE_URLS="https://+:443;http://+:8081"
ENV ASPNETCORE_Kestrel__Certificates__Default__Password="102030"
ENV ASPNETCORE_Kestrel__Certificates__Default__Path=/https/energia.pfx

EXPOSE 8081
EXPOSE 443
ENTRYPOINT ["dotnet", "Energia.WebSocket.dll"]