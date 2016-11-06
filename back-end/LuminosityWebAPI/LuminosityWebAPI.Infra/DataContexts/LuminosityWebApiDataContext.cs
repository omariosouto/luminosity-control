using LuminosityWebAPI.Domain;
using LuminosityWebAPI.Infra.Mappings;
using System.Data.Entity;

namespace LuminosityWebAPI.Infra.DataContexts
{
    public class LuminosityWebApiDataContext : DbContext
    {
        public LuminosityWebApiDataContext()
            : base("LuminosityWebApiConnectionString")
        {
            Database.SetInitializer<LuminosityWebApiDataContext>(new LuminosityWebApiDataContextInitializer());
            this.Configuration.LazyLoadingEnabled = false;
            this.Configuration.ProxyCreationEnabled = false;
        }

        // - API
        public DbSet<Cliente> Clientes { get; set; }
        public DbSet<Funcionario> Funcionarios { get; set; }
        public DbSet<Veiculo> Veiculos { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Configurations.Add(new ClienteMap());
            modelBuilder.Configurations.Add(new FuncionarioMap()); 
            modelBuilder.Configurations.Add(new VeiculoMap());
            modelBuilder.Configurations.Add(new PedidoMap());
            base.OnModelCreating(modelBuilder);
        }
    }

    public class LuminosityWebApiDataContextInitializer : DropCreateDatabaseIfModelChanges<LuminosityWebApiDataContext>
    {
        protected override void Seed(LuminosityWebApiDataContext context)
        {

            context.Database.ExecuteSqlCommand("CREATE UNIQUE INDEX IX_Funcionario_CPF ON Funcionario (FUN_STR_CPF)");
            context.Database.ExecuteSqlCommand("CREATE UNIQUE INDEX IX_Funcionario_EMAIL ON Funcionario (FUN_STR_EMAIL)");
            context.Funcionarios.Add(new Funcionario { FUN_INT_ID = 1, FUN_STR_NOME = "Mario", FUN_STR_SOBRENOME = "Souto", FUN_STR_EMAIL = "mario@gmail.com", FUN_STR_SENHA = "teste123", FUN_STR_CPF = "414.555.661-01", FUN_STR_TEL = "(11)2745-5555", FUN_STR_CEL = "(11)98963-5362", FUN_DAT_NASCIMENTO = "2016-09-15T03:00:00.000Z", FUN_STR_LOGINHASH = "1ASUHDADHUSASAD", FUN_INT_ACESSO = 0, FUN_STR_ENDRECO = "Rua Campos Cerrados, 510" });
            context.Funcionarios.Add(new Funcionario { FUN_INT_ID = 2, FUN_STR_NOME = "Larissa", FUN_STR_SOBRENOME = "Rodrigues", FUN_STR_EMAIL = "larissa@gmail.com", FUN_STR_SENHA = "teste123", FUN_STR_CPF = "414.555.662-01", FUN_STR_TEL = "(11)2745-5359", FUN_STR_CEL = "(11)92763-5454", FUN_DAT_NASCIMENTO = "2016-09-15T03:00:00.000Z", FUN_STR_LOGINHASH = "2ASUHDADHUSASAD", FUN_INT_ACESSO = 0, FUN_STR_ENDRECO = "Tatuapé, 510" });
            context.Funcionarios.Add(new Funcionario { FUN_INT_ID = 3, FUN_STR_NOME = "Guilherme", FUN_STR_SOBRENOME = "Pozzi", FUN_STR_EMAIL = "guilherme@gmail.com", FUN_STR_SENHA = "teste123", FUN_STR_CPF = "414.555.663-01", FUN_STR_TEL = "(11)2745-5585", FUN_STR_CEL = "(11)93763-5353", FUN_DAT_NASCIMENTO = "2016-09-15T03:00:00.000Z", FUN_STR_LOGINHASH = "3ASUHDADHUSASAD", FUN_INT_ACESSO = 0, FUN_STR_ENDRECO = "Belém, 510" });
            context.SaveChanges();

            context.Database.ExecuteSqlCommand("CREATE UNIQUE INDEX IX_Cliente_CPF ON Cliente (CLI_STR_CPF)");
            context.Database.ExecuteSqlCommand("CREATE UNIQUE INDEX IX_Cliente_EMAIL ON Cliente (CLI_STR_EMAIL)");
            context.Clientes.Add(new Cliente { CLI_INT_ID = 1, CLI_STR_NOME = "Josivaldo", CLI_STR_SOBRENOME = "Souto", CLI_STR_EMAIL = "josivaldo@gmail.com", CLI_STR_CPF = "414.555.666-01", CLI_STR_TEL = "(99)1255-5555", CLI_STR_CEL = "(99)9155-55555", CLI_DAT_NASCIMENTO = "2016-09-15T03:00:00.000Z", CLI_STR_ENDRECO = "Rua Patricios Cerrados, 510" });
            context.Clientes.Add(new Cliente { CLI_INT_ID = 2, CLI_STR_NOME = "Cleonilson", CLI_STR_SOBRENOME = "Pacheco", CLI_STR_EMAIL = "cleonilson@gmail.com", CLI_STR_CPF = "424.555.666-01", CLI_STR_TEL = "(99)2255-5555", CLI_STR_CEL = "(99)9255-55555", CLI_DAT_NASCIMENTO = "2016-09-15T03:00:00.000Z", CLI_STR_ENDRECO = "Rua Campos Abertos, 510" });
            context.Clientes.Add(new Cliente { CLI_INT_ID = 3, CLI_STR_NOME = "Marilia", CLI_STR_SOBRENOME = "Souza", CLI_STR_EMAIL = "marilia@gmail.com", CLI_STR_CPF = "434.555.666-01", CLI_STR_TEL = "(99)3255-5555", CLI_STR_CEL = "(99)9355-55555", CLI_DAT_NASCIMENTO = "2016-09-15T03:00:00.000Z", CLI_STR_ENDRECO = "Rua Florindos Cerrados, 510" });
            context.Clientes.Add(new Cliente { CLI_INT_ID = 4, CLI_STR_NOME = "Monica", CLI_STR_SOBRENOME = "Santana", CLI_STR_EMAIL = "monica@gmail.com", CLI_STR_CPF = "444.555.666-01", CLI_STR_TEL = "(99)4255-5555", CLI_STR_CEL = "(99)9455-55555", CLI_DAT_NASCIMENTO = "2016-09-15T03:00:00.000Z", CLI_STR_ENDRECO = "Rua Belém, 510" });
            context.Clientes.Add(new Cliente { CLI_INT_ID = 5, CLI_STR_NOME = "Josinei", CLI_STR_SOBRENOME = "Euclides", CLI_STR_EMAIL = "josinei@gmail.com", CLI_STR_CPF = "454.555.666-01", CLI_STR_TEL = "(99)5255-5555", CLI_STR_CEL = "(99)9555-55555", CLI_DAT_NASCIMENTO = "2016-09-15T03:00:00.000Z", CLI_STR_ENDRECO = "Rua Caetano, 510" });

            context.SaveChanges();

            context.Database.ExecuteSqlCommand("CREATE UNIQUE INDEX IX_Veiculo_PLACA ON Veiculo (VEI_STR_PLACA)");
            context.Veiculos.Add(new Veiculo { VEI_INT_ID = 1, VEI_STR_MARCA = "Peugeot", VEI_STR_MODELO = "307", VEI_STR_KM = "500", VEI_DAT_ANO = "2016-09-15T03:00:00.000Z", VEI_STR_PLACA = "CLS-5069", VEI_STR_STATUS = "A" });
            context.Veiculos.Add(new Veiculo { VEI_INT_ID = 2, VEI_STR_MARCA = "Volkswagen", VEI_STR_MODELO = "Gol", VEI_STR_KM = "500", VEI_DAT_ANO = "2016-09-15T03:00:00.000Z", VEI_STR_PLACA = "PEO-5068", VEI_STR_STATUS = "D" });
            context.Veiculos.Add(new Veiculo { VEI_INT_ID = 3, VEI_STR_MARCA = "Uno", VEI_STR_MODELO = "Fiat", VEI_STR_KM = "0", VEI_DAT_ANO = "2016-09-15T03:00:00.000Z", VEI_STR_PLACA = "FIA-0050", VEI_STR_STATUS = "D" });
            context.SaveChanges();

            context.Pedidos.Add(new Pedido { PED_INT_ID = 1, FUN_INT_ID = 1, VEI_INT_ID = 1, CLI_INT_ID = 1, PED_STR_STATUS = "A", PED_DAT_RETORNO = "2016-09-15T03:00:00.000Z" });
            context.SaveChanges();

            base.Seed(context);

        }
    }
}
