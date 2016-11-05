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
            context.Funcionarios.Add(new Funcionario { FUN_INT_ID = 1, FUN_STR_NOME = "Mario", FUN_STR_SOBRENOME = "Souto", FUN_STR_EMAIL = "mario@gmail.com", FUN_STR_SENHA = "teste12", FUN_STR_CPF = "44455566601", FUN_STR_TEL = "9999-5555", FUN_STR_CEL = "99999-5555", FUN_DAT_NASCIMENTO = "2016-09-15T03:00:00.000Z", FUN_STR_LOGINHASH = "1ASUHDADHUSASAD", FUN_INT_ACESSO = 0, FUN_STR_ENDRECO = "Rua Campos Cerrados, 510" });
            context.Funcionarios.Add(new Funcionario { FUN_INT_ID = 2, FUN_STR_NOME = "Larissa", FUN_STR_SOBRENOME = "Rodrigues", FUN_STR_EMAIL = "larissa@gmail.com", FUN_STR_SENHA = "teste123", FUN_STR_CPF = "44455566602", FUN_STR_TEL = "9999-5555", FUN_STR_CEL = "99999-5555", FUN_DAT_NASCIMENTO = "2016-09-15T03:00:00.000Z", FUN_STR_LOGINHASH = "2ASUHDADHUSASAD", FUN_INT_ACESSO = 0, FUN_STR_ENDRECO = "Tatuapé, 510" });
            context.Funcionarios.Add(new Funcionario { FUN_INT_ID = 3, FUN_STR_NOME = "Guilherme", FUN_STR_SOBRENOME = "Pozzi", FUN_STR_EMAIL = "guilherme@gmail.com", FUN_STR_SENHA = "teste124", FUN_STR_CPF = "44455566603", FUN_STR_TEL = "9999-55555", FUN_STR_CEL = "99999-5555", FUN_DAT_NASCIMENTO = "2016-09-15T03:00:00.000Z", FUN_STR_LOGINHASH = "3ASUHDADHUSASAD", FUN_INT_ACESSO = 0, FUN_STR_ENDRECO = "Belém, 510" });
            context.SaveChanges();

            context.Database.ExecuteSqlCommand("CREATE UNIQUE INDEX IX_Cliente_CPF ON Cliente (CLI_STR_CPF)");
            context.Database.ExecuteSqlCommand("CREATE UNIQUE INDEX IX_Cliente_EMAIL ON Cliente (CLI_STR_EMAIL)");
            context.Clientes.Add(new Cliente { CLI_INT_ID = 1, CLI_STR_NOME = "José", CLI_STR_SOBRENOME = "Souto", CLI_STR_EMAIL = "jose@gmail.com", CLI_STR_CPF = "44455566601", CLI_STR_TEL = "9999-5555", CLI_STR_CEL = "99999-5555", CLI_DAT_NASCIMENTO = "2016-09-15T03:00:00.000Z", CLI_STR_ENDRECO = "Rua Campos Cerrados, 510" });
            context.Clientes.Add(new Cliente { CLI_INT_ID = 2, CLI_STR_NOME = "João", CLI_STR_SOBRENOME = "Rodrigues", CLI_STR_EMAIL = "joao@gmail.com", CLI_STR_CPF = "44455566602", CLI_STR_TEL = "9999-5555", CLI_STR_CEL = "99999-5555", CLI_DAT_NASCIMENTO = "2016-09-15T03:00:00.000Z", CLI_STR_ENDRECO = "Tatuapé, 510" });
            context.Clientes.Add(new Cliente { CLI_INT_ID = 3, CLI_STR_NOME = "Maria", CLI_STR_SOBRENOME = "Pozzi", CLI_STR_EMAIL = "maria@gmail.com", CLI_STR_CPF = "44455566603", CLI_STR_TEL = "9999-55555", CLI_STR_CEL = "99999-5555", CLI_DAT_NASCIMENTO = "2016-09-15T03:00:00.000Z", CLI_STR_ENDRECO = "Belém, 510" });
            context.SaveChanges();

            context.Database.ExecuteSqlCommand("CREATE UNIQUE INDEX IX_Veiculo_PLACA ON Veiculo (VEI_STR_PLACA)");
            context.Veiculos.Add(new Veiculo { VEI_INT_ID = 1, VEI_STR_MARCA = "Peugeot", VEI_STR_MODELO = "307", VEI_STR_KM = "500", VEI_DAT_ANO = "2016-09-15T03:00:00.000Z", VEI_STR_PLACA = "CLS-5069", VEI_STR_STATUS = "A" });
            context.Veiculos.Add(new Veiculo { VEI_INT_ID = 2, VEI_STR_MARCA = "Volkswagen", VEI_STR_MODELO = "Gol", VEI_STR_KM = "500", VEI_DAT_ANO = "2016-09-15T03:00:00.000Z", VEI_STR_PLACA = "CLS-5068", VEI_STR_STATUS = "D" });
            context.SaveChanges();

            context.Pedidos.Add(new Pedido { PED_INT_ID = 1, FUN_INT_ID = 1, VEI_INT_ID = 1, CLI_INT_ID = 1, PED_STR_STATUS = "A", PED_DAT_RETORNO = "2016-09-15T03:00:00.000Z" });
            context.SaveChanges();

            base.Seed(context);

        }
    }
}
