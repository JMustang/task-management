<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest


## Rodando Postgres via Docker

```bash
> docker run --name postgres-nest -p 5432:5432 -e POSTGRES_PASSWORD=postgres -d postgres
```

- **Docker**: chamada para o docker
- **run**: Rodar uma conteiner
- **--name**: nome do conteiner
- **-p** 5432:5432: Porta que sera usada pelo docker - essa porta aponta para o host
- **-e**: Variavel de ambiente, aqui eu estou setando a senha do postgres POSTGRES_PASSWORD=postgres
- **-d**: Vai rodar no modo Detached(se o terminal for fechado o conteiner continuara rodando)
- **postgres**: O conteiner que sera criado
 
## NestCLI

```bash
nest g --help
nest g module nome-do-module
nest g controller nome-do-controller --no-spec
nest g service nome-do-service --no-spec
```
- A flag **--no-spec** serve pra os arquivos de controller test não serem adicionados.

 ## NestJS Modules

- Cada aplicação tem pelo menos um module - o **root module**. Que é o ponto inicial da aplicação.
- Modules são uma forma efetiva de organizar os componentes por um conjunto de capacidades intimamente relacionadas.
- São boas práticas ter uma pasta por module, contendo o module`s components.
- Modules são **Singletons**. Portanto, um module pode ser importado por múltiplos modules.

## Definindo um Module.

- Um **Module** é definido usando o **Decorator** **@Module** na criação da classe.
- O **Decorator** providencia metadata que o nest usa pra organizar a estrutura da aplicação

## Propriedades do @Modules Decorator

- **Providers**:  Array de provedores que estar disponível dentro do módulo através de injeção de dependência.
- **Controllers**: Array de controladores que serem instanciados dentro do Module.
- **Exports**: Array de provedores para exportar para outros Modules.
- **Imports**: Lista de modules necessários para este module. Qualquer provedor exportado por esses module estará agora disponível em nosso module através de injeção de dependência.


## Exemplo de Modules
 
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
## NestJS Controllers

- Responsável por lidar com as **Request** recebidas e retorna **Responses** ao cliente.
- Vinculado a um caminho específico (por exemplo, “/task” para o recurso de task).
- Contem manipuladores, que lidam com **endpoints** e métodos de **Requests** (GET, POST, DELETE, etc.)
- Pode aproveitar a injeção de dependência para consumir **providers** no mesmo **module**.

## Definindo controllers.

- **Controllers** são definidos por **Decorators** com o @**Controller decorator**.
- O **decorator** aceita uma **string**, o path para lidar com o **Controller**.

EX: 

```ts
@Controller('/tasks')
export class TaskController {
return ...
}
```

## Definindo um Handler.

- **Handlers** são simples métodos na classe Controller, (@Get, @Post, @Delete, etc.)

EX:

```ts
@Controller('/tasks')
export class TaskController {
  @Get()
  getAllTasks() {
    return ...;
  }

  @Post()
  createTask() {
    return ...;
  }
```  

## NestJS Providers

- Pode ser injetado em construtores se decorado como um @Injectable, por injeção de dependência.
- Pode ser um valor simples, uma classe, sync/async, etc.
- Os Providers devem ser fornecidos ao module para serem utilizáveis.
- Pode ser exportado a partir de um module - e, em seguida, estar disponível para outros modules que o importam.

## O que é um Service?

- Definidos como providers. Nem todos os providers são services
- Conceito comum no desenvolvimento de software e não são exclusivos NestJS, JavaScript ou desenvolvimento back-end.
- Singleton quando embrulhado com @Injectable() e fornecido a um module. Isso significa que a mesma instância será compartilhada em todo o aplicativo - agindo como uma única fonte de verdade.
- A principal fonte da lógica. Por exemplo, um serviço será chamado um controller para validar dados, criar um item no banco de dados e retornar uma response.

## Providers em Modules

EX:

```ts
import { TasksController } from './tasks/tasks.controller';
import { TasksService } from './tasks/task.service';
import { LoggerService } from '../shared/logger.service';

@Module({
  controllers: [
    TasksController,
    ],
    providers: [
      TasksService,
      LoggerService
       ]
})
export class TasksModule {}

```

## Injeção de dependência no NestJS

- Qualquer componente no ecossistema NestJS pode injetar um provedor decorado com o @Injectale.
- Definimos as dependências no construtor da classe. NestJS cuidará da injeção para nós, e então estará disponível como uma propriedade de classe.

EX: 

```ts
import { TasksService } from './tasks.service';

@Controller('/tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  async getAllTasks() {
    return await this.tasksService.getAllTasks();
  }
}

```


# Data Transfer Object (DTO)

- Um, Data transfer object (DTO) é um objeto usado para encapsular dados e enviá-lo de um subsistema de um aplicativo para outro.
- Um DTO é um objeto que define como os dados serão enviados na rede.

## Mais sobre (DTO)

- Conceito comum no desenvolvimento de software que não é específico do NestJS.
- Resulte em mais código à prova de balas, pois pode ser usado como um tipo TypeScript.
- Não tenha nenhum comportamento exceto para armazenamento, recuperação, serialização e deserção de seus próprios dados.
- Resulte em aumento de desempenho (embora insignificante em aplicação pequena).
- Um DTO NÃO é uma definição de modelo. Ele define a forma de dados para um caso específico, por exemplo — criar uma tarefa.
- Pode ser definido usando uma **interface** ou uma **classe**.

## Classes VS Interfaces.

- O objeto de transferência de dados (DTOs) pode ser definido como classes ou interfaces.
- A abordagem recomendada é o uso de **Classes**, também documentadas na documentação do NestJS.
- A razão é que as interfaces fazem parte do **TypeScript** portanto, não são preservadas após a compilação.
- As **classes** nos permitem fazer mais, e como eles fazem parte do JavaScript, eles preservarão a pós-compilação.
- O NestJS não pode se referir à interface em tempo de execução, mas pode se referir a **classes**.

## Nota Importante!

- O objeto de transferência de dados NÃO é obrigatório.
- Você ainda pode desenvolver aplicativos sem usar DTOs.
- No entanto, o valor que eles adicionam faz valer a pena usá-los quando aplicável.
- Aplicar o padrão DTO o mais rápido possível facilitará a manutenção e refatoração do seu código.


## NestJS pipes

- os Pipes operam nos argumentos a serem processados pelo manipulador de rota, pouco antes de o manipulador ser chamado.
- Os pipes podem realizar a transformação de dados ou validação de dados.
- Os pipes podem retornar dados — originais ou modificados — que serão repassados ao manipulador de rotas.
- Os pipes podem lançar exceções. O lançamento de exceções será manipulado pelo NestJS e analisado em uma resposta de erro.
- Os pipes pode ser assíncrono.

## Pipes padrão no nestJS

- O NestJS envia pipes úteis no módulo **@nestjs/comum**.

### Pipe de validação.

- Valida a compatibilidade de um objeto inteiro contra uma classe (combina bem com DTOs ou Objetos de Transferência de Dados). Se qualquer propriedade não puder ser mapeada adequadamente (por exemplo, tipo de incompatibilidade) a validação falhará.
- Um caso de uso muito comum, portanto, ter um pipe de validação embutido é extremamente útil.

### ParseIntPipe

- por padrão, os argumentos são do tipo **String**. Este pipe valida que um argumento é um número. Se for bem-sucedido, o argumento é transformado em um **Number** e passado para o manipulador.

## Implementação personalizada de pipe

- Os pipes são classes anotadas com o decorator de **@Injectable**.
- Os pipes devem implementar a interface genérica PipeTransform. Portanto, cada pipe deve ter um método de **transform()**. Este método será chamado pela NestJS para processar os argumentos.
- o método **transform()** aceita dois parâmetros:
1. Value: o value do argumento processado. 
2. Metadata (opcional): um objeto contendo metadata sobre o argumento. 
- O que for devolvido do método **transform()** será passado para o manipulador de rotas. Exceções serão enviadas de volta ao cliente.
- Pipes podem ser consumidos de várias formas.

Os pipes de nível de manipulador são definidos no nível do manipulador, através do decorador @UsePipes(). Esse pipe processará todos os parâmetros para as solicitações recebidas.

```ts

@Post()

@UsePipes(SomePipe)

createTask(

@Body(‘description’) description) {

//…

}

```

Os pipes de nível de parâmetro são definidos no nível do parâmetro. Apenas o parâmetro específico para o qual o pipe foi especificado será processado.

```ts

@Post()

createTask(

@Body(‘description’, SomePipe) description) {

//…

}

```

Os pipes globais são definidos no nível de aplicação e serão aplicados a qualquer solicitação recebida.

```ts

async function bootstrap() {

const app = await NestFactory.create(ApplicationModule);

app.useGlobalPipes(SomePipe);

await app.listen(3000);

}

bootstrap();

```

## Pipes de nível de parâmetro vs nível de manipuladores. Qual deles usar?

 **Isso depende**. 

- Pipes de nível parâmetro tendem a ser mais fina e limpa. No entanto, eles muitas vezes resultam em código extra adicionado aos manipuladores — isso pode ficar confuso e difícil de manter.
- Os pipes de nível de manipuladores exigem um pouco mais de código, mas fornecem alguns grandes benefícios:
1. Esses pipes não requerem código extra no nível do parâmetro. 
2. Mais fácil de manter e expandir. Se a forma dos dados muda, é fácil efetuar as mudanças necessárias apenas no pipe. 
3. A responsabilidade de identificar os argumentos para processar é transferida para um arquivo central — o **pipe file**. 
4. Promover o uso de DTOs (Objetos de Transferência de Dados), o que é uma prática ótima.


## Mapeamento Relacional de Objetos (ORM)

- O Mapeamento Relacional de Objetos é uma técnica que permite consultar e manipular dados de um banco de dados, usando um paradigma orientado a objetos.
- Existem muitas bibliotecas ORM que permitem que os desenvolvedores se comuniquem com o banco de dados usando sua linguagem de programação preferida, em vez de enviar consultas simples diretamente.

### Pros e contras de usar uma biblioteca ORM

1. Pros.
- Escrevendo o modelo de dados em um só lugar - mais fácil de manter. Menos repetição.
- Muitas coisas feitas automaticamente - manipulação de banco de dados, tipo de dados, relações etc.
- Não há necessidade de escrever sintaxe SQL (fácil de aprender, difícil de dominar). Usando sua maneira natural de codificação.
- Abstração de banco de dados - você pode alterar o tipo de banco de dados sempre que desejar.
- Aproveita a POO, portanto, coisas como herança são fáceis de alcançar.

1. Contras
- Você precisa aprender, e as bibliotecas ORM nem sempre são simples.
- O desempenho é bom, mas é fácil negligenciar.
- Facilita esquecer (ou nunca aprender) o que está acontecendo nos bastidores, o que pode levar a uma variedade de problemas de manutenção.

## TypeORM

- TypeORM é uma biblioteca ORM que pode ser executada em Node.js e usada com TypeScript (ou JavaScript).
- Nos ajuda a definir e gerenciar entidades, repositórios, colunas, relações, replicação, índices, consultas, logs e muito mais.

### Exemplo

- Recuperando todas as tarefas pertencentes a "Ashley" e com status "Concluído".

```ts
// TypeORM:
const tasks = await Task.find({ status: 'DONE', user: 'Ashley' })
```
```js
// JavaScript puro
let tasks;
db.query('SELECT * FROM tasks WHERE status = 'DONE' AND user = 'Ashley"', (err, result) => {
  if (err) {
    throw new Error('Could not retrieve tasks!');
  }
  tasks = result.rows;
   });
```