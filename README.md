<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

 

 ### NestJS Modules

- Cada aplicação tem pelo menos um module - o **root module**. Que é o ponto inicial da aplicação.
- Modules são uma forma efetiva de organizar os componentes por um conjunto de capacidades intimamente relacionadas.
- São boas práticas ter uma pasta por module, contendo o module`s components.
- Modules são **Singletons**. Portanto, um module pode ser importado por múltiplos modules.

# Definindo um Module.

- Um **Module** é definido usando o **Decorator** **@Module** na criação da classe.
- O **Decorator** providencia metadata que o nest usa pra organizar a estrutura da aplicação

# Propriedades do @Modules Decorator

- **Providers**:  Array de provedores que estar disponível dentro do módulo através de injeção de dependência.
- **Controllers**: Array de controladores que serem instanciados dentro do Module.
- **Exports**: Array de provedores para exportar para outros Modules.
- **Imports**: Lista de modules necessários para este module. Qualquer provedor exportado por esses module estará agora disponível em nosso module através de injeção de dependência.


# Exemplo de Modules
 
```ts
@Module({
  providers: [ForumService],
  controllers: [ForumController],
  imports: [
    PostModule,
    CommentModule,
    AuthModule
  ],
  exports: [
    ForumService
    ]
})
export class ForumModule {}
```

## NestCLI

```bash
nest g --help
nest g module tasks
```