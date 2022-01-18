#define _WINSOCK_DEPRECATED_NO_WARNINGS

#include <iostream>
#include <clocale>
#include <ctime>

#include "ErrorMsgText.h"
#include "Winsock2.h"                
#pragma comment(lib, "WS2_32.lib")   

int main() {
    setlocale(LC_ALL, "rus");

    WSADATA wsaData;
    SOCKET cC;
    SOCKADDR_IN serv;
    serv.sin_family = AF_INET;
    serv.sin_port = htons(40000);
    serv.sin_addr.s_addr = inet_addr("127.0.0.1");

    try {
        if (WSAStartup(MAKEWORD(2, 0), &wsaData) != 0) {
            throw  SetErrorMsgText("Startup: ", WSAGetLastError());
        }
        if ((cC = socket(AF_INET, SOCK_STREAM, NULL)) == INVALID_SOCKET) {
            throw  SetErrorMsgText("socket: ", WSAGetLastError());
        }
        if ((connect(cC, (sockaddr*)&serv, sizeof(serv))) == SOCKET_ERROR) {
            throw SetErrorMsgText("connect: ", WSAGetLastError());
        }
        char ibuf[50] = "server: принято ";
        int  libuf = 0, lobuf = 0;
        string obuf = "Message for server";
        if ((lobuf = send(cC, obuf.c_str(), strlen(obuf.c_str()) + 1, NULL)) == SOCKET_ERROR) {
            throw SetErrorMsgText("send: ", WSAGetLastError());
        }
        if ((libuf = recv(cC, ibuf, sizeof(ibuf), NULL)) == SOCKET_ERROR) {
            throw SetErrorMsgText("recv: ", WSAGetLastError());
        }

        cout << ibuf << endl;
        
        if (closesocket(cC) == SOCKET_ERROR) {
            throw SetErrorMsgText("closesocket: ", WSAGetLastError());
        }
        if (WSACleanup() == SOCKET_ERROR) {
            throw  SetErrorMsgText("Cleanup: ", WSAGetLastError());
        }
    }
    catch (string errorMsgText) {
        cout << endl << errorMsgText;
    }
    system("pause");
    return 0;
}