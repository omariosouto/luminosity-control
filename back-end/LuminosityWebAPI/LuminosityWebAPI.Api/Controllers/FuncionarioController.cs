using LuminosityWebAPI.Domain;
using LuminosityWebAPI.Api.Commons;
using LuminosityWebAPI.Infra.DataContexts;
using System;
using System.Data;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;

namespace LuminosityWebAPI.Api.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    [RoutePrefix("api/v1/public")]
    public class FuncionarioController : ApiController
    {
        private LuminosityWebApiDataContext db = new LuminosityWebApiDataContext();
        private KeyGenerator keyGen = new KeyGenerator();

        // Listar todos
        [Route("funcionarios")]
        public HttpResponseMessage GetFuncionarios()
        {
            var result = db.Funcionarios.ToList();
            return Request.CreateResponse(HttpStatusCode.OK, result);
        }

        // Adicionar Novo
        [HttpPost]
        [Route("funcionarios")]
        public HttpResponseMessage PostFuncionario(Funcionario funcionario)
        {
            if (funcionario == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }
            try
            {
                db.Funcionarios.Add(funcionario);
                db.SaveChanges();

                var result = funcionario;
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "Falha ao incluir Funcionário, verifique se o e-mail e o CPF estão corretos.");
            }
        }

        // Alterar
        [HttpPut]
        [Route("funcionarios")]
        public HttpResponseMessage PutFuncionario(Funcionario funcionario)
        {
            if (funcionario == null)
                return Request.CreateResponse(HttpStatusCode.BadRequest);

            try
            {
                db.Entry<Funcionario>(funcionario).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();

                var result = funcionario;
                return Request.CreateResponse(HttpStatusCode.OK, result);
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "Falha ao alterar Funcionário, verifique se o e-mail e o CPF estão corretos.");
            }
        }

        // Delete
        [HttpDelete]
        [Route("funcionarios")]
        public HttpResponseMessage DeleteFuncionario(int funcionarioId)
        {
            if (funcionarioId <= 0)
                return Request.CreateResponse(HttpStatusCode.BadRequest);

            try
            {
                db.Funcionarios.Remove(db.Funcionarios.Find(funcionarioId));
                db.SaveChanges();

                return Request.CreateResponse(HttpStatusCode.OK, "Funcionário excluido.");
            }
            catch
            {
                return Request.CreateResponse(HttpStatusCode.InternalServerError, "Falha ao excluir Funcionário");
            }
        }


        // funcionarios/login
        [Route("funcionarios/login")]
        public HttpResponseMessage PostLogin(Funcionario login)
        {
            if (login == null)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Nenhum parametro foi enviado para efetuar login");
            }

            // Busca infos no banco:
            try
            {
                var user = (from x in db.Funcionarios
                            where x.FUN_STR_EMAIL == login.FUN_STR_EMAIL
                            select x).FirstOrDefault();
                var getEmail = user.FUN_STR_EMAIL;
                var getPassword = user.FUN_STR_SENHA;

                // Validação de Senha
                if (getPassword != login.FUN_STR_SENHA)
                {
                    // Senha inválida
                    return Request.CreateResponse(HttpStatusCode.BadRequest, "Senha inválida");
                }

                user.FUN_STR_LOGINHASH = keyGen.GetUniqueKey(40);

                db.Entry<Funcionario>(user).State = System.Data.Entity.EntityState.Modified;
                db.SaveChanges();

                // Sucesso
                return Request.CreateResponse(HttpStatusCode.OK, user.FUN_STR_LOGINHASH);
            }
            catch
            {
                // E-mail inválido
                return Request.CreateResponse(HttpStatusCode.BadRequest, "Usuário não encontrado");
            }

        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
        }
    }
}