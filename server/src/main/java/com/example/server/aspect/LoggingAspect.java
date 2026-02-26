package com.example.server.aspect;

import jakarta.servlet.http.HttpServletRequest;
import lombok.extern.slf4j.Slf4j;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.*;

import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Component
@Slf4j
@Aspect
public class LoggingAspect {
    @Pointcut("execution(public * com.example.server.controller.*.*(..))")
    public void controllerLog(){}

    @Pointcut("execution(public * com.example.server.service.*.*(..))")
    public void serviceLog(){}

    @Before("controllerLog()")
    public void doBeforeController(JoinPoint joinPoint){
        ServletRequestAttributes attrs = (ServletRequestAttributes) RequestContextHolder.getRequestAttributes();
        HttpServletRequest request = null;

        if (attrs != null) {
            request = attrs.getRequest();
        }
        if (request != null) {
            log.info("Новый запрос: URL: {}, HTTP_METHOD: {}, CONTROLLER_METHOD: {}.{}",
                    request.getRequestURL().toString(),
                    request.getMethod(),
                    joinPoint.getSignature().getDeclaringTypeName(),
                    joinPoint.getSignature().getName());
        }
    }
}
