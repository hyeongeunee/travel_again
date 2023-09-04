비동기 지원은 Servlet 3.0에 도입된 기능
- 요청에 대한 수신을 다른 Thread에서 처리 함 
- Spring 3.2 부터 제공 되는 기능으로 DeferredResult 사용
- http-worker Thread에서 별도의 Thread에서 실행 됨 
- polling은 http 요청과 같은 Thread에서 처리가 되므로 사용자가 많아지면 서버에 부담이 되고 지연 처리에 대한 단점이 해결됨